/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Order from '../models/Order';
import config from '../config';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return QueryBuilder(Order)
        .paginate(Number(page) || 1, Number(items) || 25)
        .get()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getOwn = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const user = req.user as IUserModel;

    return QueryBuilder(Order)
        .where('id', user.id!)
        .paginate(Number(page) || 1, Number(items) || 25)
        .get()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Order.find<IOrderModel>(id)
        .then((order) => {
            if (!order) {
                return res.status(404).json({ status: 'error', data: 'Resource not found!' });
            }
            return res.status(200).json({ status: 'success', data: order });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const loggedInUser = req.user as IUserModel;

    if (req.body.coupon_code_id) {
        console.log('validate / apply the coupon code here');
    }

    const orderItems = req.body.order_items as IOrderItemData[];

    return Order.create<IOrderModel>({ user_id: loggedInUser.id, order_status: config.ORDER_STATUS.PENDING, price: 0 })
        .save()
        .then((order: IOrderModel) => {
            // console.log(`Created order with id = ${order.id} and code =${order.code}`);
            orderItems.forEach((orderItem) => {
                // eslint-disable-next-line consistent-return
                Product.find<IProductModel>(orderItem.product_id).then((product) => {
                    if (product && product.stock_qty && product.stock_qty >= orderItem.quantity) {
                        OrderItem.create<IOrderItemModel>({
                            product_id: product.id,
                            quantity: orderItem.quantity,
                            order_id: order.id,
                            price: product.price,
                        })
                            .save()
                            .then(async () => {
                                order.price += product.price; // apply discounts here
                                await order.save();
                            });
                    } else {
                        return res.status(409).json({ status: 'error', data: 'Insufficient stock!' });
                    }
                });
            });
            return res.status(201).json({ status: 'success', data: order });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
