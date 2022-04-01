/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import Cookies from "react-cookies";
import orderService from "../../api/styleBox/OrderService";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown(
    {
        MenuName = "MenuName",
        items = [
            {
                ItemName: "item1",
                link: "#",
                onClick: {}
            },
            {
                ItemName: "iterm2",
                link: "#",
                onClick: {}
            }
        ],
        noti
    }
) {
    return (
        <Menu style={{zIndex: "9999"}} as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button
                    className="inline-flex justify-center w-full text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                    {MenuName}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="float origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">{
                        items.map((item) => (<Menu.Item key={item.ItemName}>
                                {({active}) => (
                                    <a
                                        href={item.link}
                                        onClick={item.onClick}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {item.ItemName}
                                        {noti && item.ItemName === "Orders" ? <span className="nav-badge">!</span> : <div/>}
                                    </a>
                                )
                                }


                            </Menu.Item>)
                        )
                    }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
