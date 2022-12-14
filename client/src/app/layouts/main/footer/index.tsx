import React from 'react';

export default function Footer(): JSX.Element {
    return (
        <div className="mt-8">
            <div className="w-full bg-blue-200 dark:bg-gray-800 text-xs flex flex-row justify-between p-16">
                <div className="flex flex-col w-48">
                    <div className="flex items-center">
                        <svg width="39" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y=".027" width="39" height="39" rx="16" fill="#40BFFF" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M27.532 17.995a2.167 2.167 0 010 3.064l-6.5 6.5a2.167 2.167 0 01-3.064 0l-6.5-6.5a2.167 2.167 0 010-3.064l6.5-6.5a2.167 2.167 0 013.064 0l6.5 6.5zM19.5 16.09l-3.436 3.436 3.436 3.436 3.436-3.436L19.5 16.09z"
                                fill="#fff"
                            />
                        </svg>
                        <div className="text-base mx-2 font-semibold">E-shop</div>
                    </div>
                    <div className="mt-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry`&apos;`s standard dummy text ever.Since the 1500s, when an unknown printer.
                    </div>
                </div>
                <div className="flex flex-col w-48">
                    <div className="text-base">Follow Us</div>
                    <div className="mt-6">
                        Since the 1500s, when an unknown printer took a galley of type and scrambled.
                    </div>
                    <div className="flex mt-6 items-center space-x-6">
                        <svg width="8" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M.37 8.084H2.03v6.828a.244.244 0 00.244.244h2.812a.244.244 0 00.244-.244V8.116h1.907a.244.244 0 00.242-.216l.29-2.514a.244.244 0 00-.242-.272h-2.2V3.539c0-.475.256-.716.76-.716h1.436a.244.244 0 00.244-.244V.272a.244.244 0 00-.24-.246H5.454a3.792 3.792 0 00-2.48.935 2.6 2.6 0 00-.865 2.31v1.844H.368a.244.244 0 00-.244.244v2.48a.244.244 0 00.247.245z"
                                fill="#385C8E"
                            />
                        </svg>
                        <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.687 1.433c-.55.24-1.132.4-1.728.474A2.983 2.983 0 0014.28.249a6 6 0 01-1.9.726 3 3 0 00-5.192 2.05c-.002.23.021.46.07.685A8.49 8.49 0 011.074.572a3 3 0 00.922 4.009 2.962 2.962 0 01-1.355-.37v.034a3.014 3.014 0 002.4 2.948 2.994 2.994 0 01-.787.1 2.653 2.653 0 01-.568-.051 3.028 3.028 0 002.8 2.09 6.028 6.028 0 01-4.432 1.237 8.445 8.445 0 004.6 1.346 8.477 8.477 0 008.538-8.536c0-.133 0-.261-.01-.388a5.984 5.984 0 001.505-1.558z"
                                fill="#03A9F4"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col w-32">
                    <div className="text-base">Contact Us</div>
                    <div className="mt-6">E-Comm , 4578 Marmora Road, Glasgow D04 89GR</div>
                </div>
            </div>

            <div className="w-full bg-blue-200 dark:bg-gray-800 text-xs flex flex-col p-16">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-48">
                        <div className="text-base">Information</div>
                        <div className="mt-6 flex flex-col">
                            <div>About us</div>
                            <div>Information</div>
                            <div>Privacy Policy</div>
                            <div>Terms & Conditions</div>
                        </div>
                    </div>
                    <div className="flex flex-col w-48">
                        <div className="text-base">Service</div>
                        <div className="mt-6 flex flex-col">
                            <div>About us</div>
                            <div>Information</div>
                            <div>Privacy Policy</div>
                            <div>Terms & Conditions</div>
                        </div>
                    </div>

                    <div className="flex flex-col w-48">
                        <div className="text-base">My Account</div>
                        <div className="mt-6 flex flex-col">
                            <div>About us</div>
                            <div>Information</div>
                            <div>Privacy Policy</div>
                            <div>Terms & Conditions</div>
                        </div>
                    </div>

                    <div className="flex flex-col w-48">
                        <div className="text-base">Our Offers</div>
                        <div className="mt-6 flex flex-col">
                            <div>About us</div>
                            <div>Information</div>
                            <div>Privacy Policy</div>
                            <div>Terms & Conditions</div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex justify-end">
                    <svg width="214" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M176.765.594h35a1.701 1.701 0 011.666 1.734v21.674a1.696 1.696 0 01-1.666 1.734h-35a1.702 1.702 0 01-1.667-1.734V2.328a1.692 1.692 0 011.018-1.592c.205-.09.425-.138.649-.142z"
                            fill="url(#paint0_linear)"
                        />
                        <path
                            d="M205.07 17.82l-.252-1.295h-2.734l-.449 1.295h-2.242l3.207-8.065a.996.996 0 01.993-.649h1.729l1.722 8.715h-1.974zm-1.236-6.344l-1.13 3.261h1.766l-.636-3.261zm-7.287.114c0 .952 3 1.156 3 3.345 0 2.108-2.215 2.883-3.682 2.883a5.93 5.93 0 01-2.428-.476l.32-1.89c.88.72 3.549.925 3.549-.218s-2.975-1.17-2.975-3.346c0-2.312 2.534-2.788 3.6-2.788a6.11 6.11 0 011.934.367l-.307 1.81c-.918-.513-3.013-.635-3.013.317l.002-.004zm-6.584 6.23l1.344-8.715h2.151l-1.344 8.715h-2.151zm-5.157 0l-1.866-7.562c.329.206.644.435.941.686a6.83 6.83 0 011.981 2.865l.243 1.29 2.051-5.993h2.315l-3.422 8.715h-2.243zm-3.794-8.476l-.1-.03.1.03zm-.22-.065l-.048-.013.048.013zm.529.17l-.128-.045.128.045zm1.491.725a7.502 7.502 0 00-.2-.12c.064.045.13.083.198.125l.002-.005zm-.514-.29c-.058-.03-.118-.062-.175-.09.055.033.114.065.173.095l.002-.005zm-.535-.257l-.118-.051.118.051z"
                            fill="#494CA3"
                        />
                        <path
                            d="M185.859 13.813l-.724-3.918a.938.938 0 00-1.02-.785h-3.39l-.04.147a8.152 8.152 0 013.192 1.69 6.832 6.832 0 011.982 2.866z"
                            fill="#FFC000"
                        />
                        <path
                            d="M118.712.755h34.735A1.7 1.7 0 01155.1 2.49v21.673a1.696 1.696 0 01-1.653 1.734h-34.735a1.701 1.701 0 01-1.654-1.734V2.49a1.697 1.697 0 011.654-1.735z"
                            fill="#F1F1F1"
                        />
                        <path
                            d="M117.469 25.305a1.785 1.785 0 01-.409-1.141V2.49a1.702 1.702 0 011.654-1.735h34.734c.422.001.826.168 1.126.464l-37.1 24.086h-.005z"
                            fill="#fff"
                            fillOpacity=".73"
                        />
                        <path
                            d="M131.706 18.72l1.3-2.35-.724-5.644h1.771l.286 3.34 1.733-3.34h1.828l-4.209 7.994h-1.985zm-5.553-4.216c.273-1.374 1.6-1.81 3.562-1.81.117-.61-.272-.764-.934-.741a4.863 4.863 0 00-1.694.393l.155-1.373a7.934 7.934 0 011.985-.35c1.226-.021 2.589.37 2.278 1.963l-.759 3.75h-1.771l.116-.568a2.237 2.237 0 01-1.582.676c-.839-.004-1.586-.55-1.355-1.944l-.001.004zm1.811-.087a.494.494 0 00.187.737.5.5 0 00.28.048.91.91 0 00.935-.742c.023-.168.056-.335.1-.5h-.448a1.2 1.2 0 00-1.054.453v.004zm-7.911 1.92l1.464-7.173h3.307a1.843 1.843 0 011.761 2.44 2.749 2.749 0 01-2.732 2.356h-1.383l-.475 2.376h-1.942zm2.693-3.75h.91a1.233 1.233 0 001.109-.982.723.723 0 00-.072-.66.718.718 0 00-.581-.32h-.95l-.416 1.961z"
                            fill="#3284AE"
                        />
                        <path
                            d="M143.37 14.5c.276-1.374 1.616-1.809 3.605-1.809.138-.612-.255-.763-.925-.741a5.218 5.218 0 00-1.734.392l.158-1.373a8.504 8.504 0 012.029-.348c1.241-.022 2.599.369 2.284 1.96l-.767 3.75h-1.774l.119-.566c-.43.429-1.011.672-1.619.676-.858 0-1.613-.546-1.376-1.941zm1.833-.087a.509.509 0 00.493.785.899.899 0 00.925-.74c.039-.175.06-.328.101-.5h-.434a1.238 1.238 0 00-1.089.454h.004zm3.636 1.918l1.466-7.194h1.82l-1.485 7.194h-1.801zm-11.569 0l1.462-7.171h3.299a1.85 1.85 0 011.757 2.44 2.745 2.745 0 01-2.745 2.355h-1.362l-.494 2.375h-1.917zm2.687-3.75h.887a1.25 1.25 0 001.128-.98.733.733 0 00-.339-.892.73.73 0 00-.332-.088h-.948l-.396 1.96z"
                            fill="#3CA9C7"
                        />
                        <path
                            d="M60.529.594h34.973a1.7 1.7 0 011.665 1.734v21.674a1.699 1.699 0 01-1.665 1.734H60.529a1.7 1.7 0 01-1.665-1.734V2.328A1.7 1.7 0 0160.529.594z"
                            fill="#5870BE"
                        />
                        <path
                            d="M75.619 13.16a8.978 8.978 0 1117.956.004 8.978 8.978 0 01-17.956-.003z"
                            fill="#FFAF38"
                        />
                        <path
                            d="M70.84 22.14a8.98 8.98 0 117.19-14.36h-1.2v.6h1.613c.121.191.235.389.341.589H76.23v.6h2.843c.088.2.167.4.237.6h-3.68v.6h3.868a9.033 9.033 0 01-.192 5.389H75.63v.6h3.44c-.09.207-.188.4-.286.59H76.23v.6h2.206c-.133.21-.272.412-.413.601H76.83v.6h.7a8.993 8.993 0 01-6.69 2.99z"
                            fill="#E63737"
                        />
                        <path
                            d="M60.989 14.813l.546-4.26.849.109.621 3.145c.057.293.098.512.122.657.069-.149.173-.367.315-.654l1.4-2.833.758.098-.546 4.26-.544-.07.458-3.566-1.696 3.407-.508-.065-.767-3.785-.465 3.627-.543-.07zm6.97.507c-.215.14-.417.232-.606.277a1.617 1.617 0 01-.588.028c-.339-.043-.589-.16-.75-.347a.831.831 0 01-.191-.672.876.876 0 01.464-.667c.121-.061.255-.102.4-.123a3.78 3.78 0 01.474-.019c.429.004.747-.016.956-.06a6.65 6.65 0 00.02-.136c.028-.213-.002-.37-.09-.47-.118-.135-.31-.22-.573-.253-.246-.032-.434-.012-.563.06-.127.07-.233.212-.317.423l-.503-.135c.075-.213.174-.38.298-.5a1 1 0 01.502-.251c.21-.048.449-.055.714-.02.264.033.474.092.63.175a.846.846 0 01.334.282.818.818 0 01.117.375c.006.091-.006.253-.036.486l-.09.697c-.062.486-.09.796-.086.928.007.131.035.26.086.387l-.546-.07a1.117 1.117 0 01-.056-.395zm.106-1.173c-.2.053-.493.082-.88.088a1.992 1.992 0 00-.469.046.455.455 0 00-.333.382.45.45 0 00.113.37c.094.106.243.172.447.198.201.026.386.006.554-.061a.829.829 0 00.392-.32c.072-.11.122-.281.152-.511l.024-.192zm1.053.773l.528-.015c.002.21.062.38.18.507.12.128.298.207.537.238.24.03.424.005.553-.077a.447.447 0 00.219-.324.32.32 0 00-.119-.298c-.065-.056-.236-.138-.512-.246-.37-.146-.626-.264-.767-.353a.803.803 0 01-.299-.336.799.799 0 01-.06-.43.802.802 0 01.142-.37.865.865 0 01.296-.26c.09-.05.206-.085.35-.108.148-.025.302-.026.462-.006.243.031.45.093.623.186a.87.87 0 01.37.337c.073.13.112.296.12.5l-.52.004a.562.562 0 00-.157-.398c-.098-.103-.25-.168-.453-.194-.24-.03-.417-.013-.53.053-.113.066-.176.153-.19.26a.291.291 0 00.04.19.465.465 0 00.184.166c.05.026.198.09.444.193.358.146.605.26.742.343a.78.78 0 01.31.318c.069.13.091.285.068.463a.887.887 0 01-.217.475.998.998 0 01-.485.3 1.631 1.631 0 01-.667.042c-.4-.051-.696-.174-.886-.368-.188-.193-.29-.457-.306-.792zm4.269 1.008l.016.472c-.151.012-.285.01-.401-.004-.19-.024-.333-.073-.43-.147a.51.51 0 01-.19-.264c-.03-.104-.026-.313.015-.627l.227-1.775-.383-.05.052-.406.384.049.098-.764.56-.247-.138 1.078.526.067-.052.407-.526-.068-.232 1.805a.965.965 0 00-.01.291c.013.045.039.083.076.113.04.031.098.051.176.061.058.008.135.01.232.01zm2.694-.189l.532.137a1.33 1.33 0 01-.568.674c-.253.145-.558.194-.917.148-.451-.058-.792-.242-1.022-.553-.227-.313-.309-.72-.245-1.222.067-.52.252-.905.557-1.157.304-.253.669-.352 1.095-.297.413.053.732.237.957.551.226.315.306.727.24 1.236a4.6 4.6 0 01-.02.14l-2.302-.296c-.024.341.038.613.188.816.15.202.353.32.61.353a.807.807 0 00.51-.088c.15-.084.277-.23.385-.442zm-1.609-1.066l1.724.222c.01-.263-.031-.466-.123-.61a.808.808 0 00-.61-.385.843.843 0 00-.638.163c-.183.14-.3.343-.353.61zm2.676 2.214l.396-3.086.47.06-.06.468c.149-.204.278-.334.388-.39a.593.593 0 01.35-.062c.176.023.348.102.516.238l-.242.462a.755.755 0 00-.37-.163.498.498 0 00-.32.065.556.556 0 00-.232.26 2.053 2.053 0 00-.166.6l-.207 1.615-.523-.067zm5.286-.84l.545.215c-.177.447-.436.773-.775.978-.337.203-.728.276-1.171.219-.46-.059-.822-.2-1.086-.423a1.786 1.786 0 01-.553-.898 2.94 2.94 0 01-.077-1.17c.057-.444.19-.82.402-1.128.213-.309.486-.529.82-.66a2.13 2.13 0 011.068-.125c.426.055.77.209 1.033.463.263.255.426.586.49.993l-.572.06c-.059-.323-.173-.567-.343-.732-.17-.166-.397-.267-.682-.303-.327-.042-.612.001-.853.13-.239.128-.42.32-.543.574a2.551 2.551 0 00-.238.8c-.047.361-.035.685.035.97.072.282.21.505.416.667.206.163.438.26.698.294.316.04.595-.017.837-.17.242-.155.425-.406.549-.754zm3.065 1.524c-.215.14-.417.232-.606.277a1.62 1.62 0 01-.588.028c-.34-.044-.59-.16-.75-.347a.831.831 0 01-.192-.672.877.877 0 01.464-.667c.122-.061.255-.102.4-.123.106-.014.264-.02.475-.019.429.004.747-.016.956-.06a7.23 7.23 0 00.02-.136c.028-.213-.003-.37-.09-.47-.119-.135-.31-.22-.573-.253-.246-.032-.434-.012-.563.06-.127.07-.233.212-.317.423l-.503-.135c.075-.213.174-.38.297-.5a1 1 0 01.502-.251c.211-.048.45-.055.715-.02.263.033.474.092.63.175a.845.845 0 01.333.282.817.817 0 01.118.375c.005.091-.006.253-.036.486l-.09.697c-.062.486-.091.796-.086.928.006.131.035.26.086.387l-.546-.07a1.12 1.12 0 01-.056-.395zm.106-1.173c-.2.053-.493.082-.88.088a1.994 1.994 0 00-.47.046.457.457 0 00-.332.382.45.45 0 00.112.37c.095.106.244.172.447.198.202.026.387.006.555-.061a.83.83 0 00.392-.32c.072-.11.122-.281.152-.512l.024-.191zm1.138 1.72l.396-3.086.47.06-.06.468c.15-.203.278-.333.388-.39a.592.592 0 01.35-.062c.176.023.348.102.516.238l-.242.462a.755.755 0 00-.37-.162.499.499 0 00-.32.065.555.555 0 00-.232.26 2.052 2.052 0 00-.165.599l-.208 1.615-.523-.067zm3.99.512l.05-.39c-.235.282-.542.398-.922.349a1.227 1.227 0 01-.654-.29 1.364 1.364 0 01-.407-.629 2.005 2.005 0 01-.06-.861 2.2 2.2 0 01.26-.817c.136-.24.315-.412.537-.52.223-.107.46-.144.714-.111a1.034 1.034 0 01.797.534l.197-1.53.52.067-.547 4.26-.485-.062zm-1.456-1.752c-.05.395-.005.701.136.918.142.217.326.34.552.37a.743.743 0 00.617-.205c.185-.167.302-.443.352-.826.054-.423.012-.743-.125-.962a.757.757 0 00-1.184-.163c-.18.17-.296.459-.348.868z"
                            fill="#fff"
                        />
                        <path
                            d="M2.661.792h34.983a1.7 1.7 0 011.665 1.734v21.676a1.7 1.7 0 01-1.665 1.733H2.66a1.7 1.7 0 01-1.666-1.733V2.526A1.7 1.7 0 012.661.792z"
                            fill="#353A40"
                        />
                        <path
                            d="M23.684 17.356a1.47 1.47 0 01-.624-.606 2.041 2.041 0 01-.24-1.038 1.863 1.863 0 01.474-1.356 1.767 1.767 0 011.321-.484 1.79 1.79 0 011.336.477 1.82 1.82 0 01.47 1.335c.014.351-.055.702-.2 1.022a1.49 1.49 0 01-.593.62c-.297.158-.63.235-.967.223a2.176 2.176 0 01-.977-.193zm.406-2.417a1.63 1.63 0 000 1.552.726.726 0 001.068 0c.152-.247.219-.538.19-.826.022-.26-.049-.52-.2-.734a.668.668 0 00-.536-.231.65.65 0 00-.522.24zm-9.912 2.574a1.408 1.408 0 01-.5-.146 1.231 1.231 0 01-.368-.307 1.14 1.14 0 01-.229-.409 2.168 2.168 0 01-.1-.6v-2.118h1.071V16.1a.626.626 0 00.16.454.668.668 0 00.871 0 .63.63 0 00.158-.457V13.93h1.071v2.118c0 .204-.033.407-.1.6-.061.184-.164.35-.3.489-.12.13-.267.233-.43.3a2.134 2.134 0 01-.752.118 4.769 4.769 0 01-.55-.043h-.002zm15.14-.024l-1.3-1.952v1.952h-1.01v-3.555h1l1.308 1.966v-1.966h1.012v3.555h-1.01zm-9.979 0l-1.3-1.952v1.952h-1.01v-3.555h1l1.308 1.966v-1.966h1.012v3.555h-1.01zm1.77-.01v-3.548h1.08v3.549h-1.08zm-8.205-4.98a1.387 1.387 0 01-.387-.888l1.022-.065c.011.139.057.272.134.388a.563.563 0 00.474.217.516.516 0 00.355-.111.321.321 0 00.006-.5 1.365 1.365 0 00-.55-.206 2.31 2.31 0 01-1.007-.432.876.876 0 01-.3-.686c0-.184.055-.363.155-.517a1.03 1.03 0 01.467-.383c.273-.104.564-.152.855-.14.357-.023.713.066 1.016.255a1.102 1.102 0 01.416.805l-1.012.061a.56.56 0 00-.17-.35.536.536 0 00-.357-.108.425.425 0 00-.282.081.253.253 0 00-.095.2.2.2 0 00.08.154c.108.07.232.114.36.13.348.064.687.17 1.01.314.181.087.335.224.442.395.093.16.14.34.138.525.002.224-.063.443-.185.63a1.172 1.172 0 01-.517.439c-.265.107-.55.158-.836.15a1.7 1.7 0 01-1.232-.36v.002zm16.414.29l-1.3-1.953v1.953h-1.01V9.234h1l1.31 1.967V9.234h1.011v3.555h-1.01zm-3.875 0l-.574-1.087a.85.85 0 00-.195-.273.445.445 0 00-.264-.083h-.095v1.443h-1.079V9.234h1.79c.256-.01.512.02.76.087.174.057.324.17.425.323a1 1 0 01.161.576c.005.178-.038.354-.123.511a.978.978 0 01-.34.347 1.297 1.297 0 01-.377.142c.1.03.194.073.28.13.064.055.122.119.171.188.057.068.108.142.151.22l.52 1.03h-1.21zm-1.127-2.116h.453c.096-.007.191-.023.284-.048a.289.289 0 00.174-.111.335.335 0 00.068-.207.331.331 0 00-.107-.265.638.638 0 00-.4-.091h-.472v.722zm-4.6 2.116V9.234h2.878v.759h-1.8v.565h1.672v.726h-1.672v.7h1.855v.805h-2.933zm-2.652 0v-2.677H15.97v-.878h3.265v.878h-1.1v2.677h-1.07zm-7.865 0V9.234h2.878v.759h-1.8v.565h1.671v.726H10.27v.7h1.853v.805H9.2zm-2.167 0l-.609-2.24-.607 2.24H4.763L3.99 9.234h1.02l.367 1.99.538-1.99h1.016l.54 1.988.366-1.988h1.015l-.766 3.555H7.032zM35.12 17.551v-8.38h1.2v8.38h-1.2zm-2.99 0v-8.38h1.2v8.38h-1.2z"
                            fill="#ECD345"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="194.265"
                                y1="25.736"
                                x2="194.265"
                                y2=".594"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#E59703" />
                                <stop offset=".231" stopColor="#E59703" />
                                <stop offset=".234" stopColor="#fff" />
                                <stop offset=".761" stopColor="#fff" />
                                <stop offset=".766" stopColor="#5457BB" />
                                <stop offset="1" stopColor="#5457BB" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
}
