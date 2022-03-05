import React, {Component} from 'react'
import tw from "twin.macro";
import "../../styles/tailwind.min.css"

const SixColumns = tw.div`mt-40 p-10 bg-white w-full flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between `;
const SixColumHeader = tw.div`text-2xl font-bold text-left w-full h-10`;
const ColumnFooter = tw.div`px-4 sm:px-0 sm:w-1/4 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;
const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-700 pb-1 transition duration-300`;

class Footer extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(<div >
            <SixColumns className="footer">
                <ColumnFooter tw="mt--2">
                    <SixColumHeader>Style Box</SixColumHeader>
                </ColumnFooter>
                <ColumnFooter>
                    <ColumnHeading>Main</ColumnHeading>
                    <LinkList>
                        <LinkListItem>
                            <Link href="#">Blog</Link>
                        </LinkListItem>
                        <LinkListItem>
                            <Link href="#">FAQs</Link>
                        </LinkListItem>
                        <LinkListItem>
                            <Link href="#">Support</Link>
                        </LinkListItem>
                        <LinkListItem>
                            <Link href="#">About Us</Link>
                        </LinkListItem>
                    </LinkList>
                </ColumnFooter>
                <ColumnFooter>
                    <ColumnHeading>Shopping</ColumnHeading>
                    <LinkList>
                        <LinkListItem>
                            <Link href="#">Women</Link>
                        </LinkListItem>
                        <LinkListItem>
                            <Link href="#">Men</Link>
                        </LinkListItem>
                        <LinkListItem>
                            <Link href="#">Kids</Link>
                        </LinkListItem>
                    </LinkList>
                </ColumnFooter>
                <ColumnFooter>
                    <ColumnHeading>Stylists</ColumnHeading>
                    <LinkList>
                        <LinkListItem>
                            <Link href="#">Stylists</Link>
                        </LinkListItem>
                    </LinkList>
                </ColumnFooter>
                <ColumnFooter>
                    <ColumnHeading>Community</ColumnHeading>
                    <LinkList>
                        <LinkListItem>
                            <Link href="#">Community</Link>
                        </LinkListItem>
                    </LinkList>
                </ColumnFooter>
                <ColumnFooter>
                    <ColumnHeading>Contact Us</ColumnHeading>
                    <LinkList>
                        <LinkListItem>
                            <div>Email: BlackBoxStyleBox@gmail.com</div>
                            <div tw='mt-4'>Phone: 1667910xxxx</div>
                        </LinkListItem>
                    </LinkList>
                </ColumnFooter>
            </SixColumns>
            </div>
        )
    }
}

export default Footer