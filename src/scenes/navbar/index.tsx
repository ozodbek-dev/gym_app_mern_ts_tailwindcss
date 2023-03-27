import {Bars3Icon,XMarkIcon} from "@heroicons/react/24/solid";
import Logo from '@/assets/Logo.png'
import Link from "@/scenes/navbar/Link";
import {SelectedPage} from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import {useState} from "react";
import ActionButton from "@/shared/ActionButton";

type PropTypes ={
    selectedPage:SelectedPage,
    isTopOfPage:boolean
    setSelectedPage:(value:SelectedPage)=>void
}
const pages = ["Home","Benefits", "Our Classes", "Contact Us"]
const Navbar = ({selectedPage,setSelectedPage,isTopOfPage }:PropTypes) => {
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)")
    const flexBetween = "flex items-center justify-between"
    console.log(isTopOfPage)
    const navbarBg = isTopOfPage ? "":"bg-primary-100 drop-shadow"
    return (
        <nav>
            <div className={`${navbarBg} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div
                        className={`${flexBetween} w-full gap-16`}
                    >
                        {/*left side*/}
                        <img src={Logo} alt="Logo"/>

                    {/* right side*/}
                        {
                            isAboveMediumScreens ? (<div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>

                                    {
                                        pages.map(page=>(
                                            <Link
                                                key={page}
                                                page={page}
                                                setSelectedPage={setSelectedPage}
                                                selectedPage={selectedPage}
                                            />
                                        ))
                                    }

                                </div>
                                <div className={`${flexBetween} gap-8 `}>
                                    <p>Sign In</p>
                                    <ActionButton
                                        setSelectedPage={setSelectedPage}
                                    >Become a Member</ActionButton>
                                </div>
                            </div>)
                                :(
                                    <button className="rounded-full bg-secondary-500 p-2"
                                            onClick={()=>setIsMenuToggled(!isMenuToggled)}
                                    >
                                        <Bars3Icon className='h-6 w-6 text-white'/>
                                    </button>
                                )
                        }
                    </div>
                </div>
            </div>
        {/*    MOBILE MENU MODAL*/}
            {!isAboveMediumScreens  && isMenuToggled && (
                 <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100  drop-shadow-xl ">
                 {/*    close icon*/}
                     <div className="flex justify-end p-12">
                         <button
                             onClick={()=>setIsMenuToggled(false)}
                         >
                             <XMarkIcon className='h-6 w-6 text-gray-400'/>
                         </button>
                     </div>
                 {/*       MENU ITEMS*/}
                     <div className="ml-[33%]  flex flex-col gap-10 text-2xl ">

                         {
                             pages.map(page=>(
                                 <Link
                                     key={page}
                                     page={page}
                                     setSelectedPage={setSelectedPage}
                                     selectedPage={selectedPage}
                                 />
                             ))
                         }

                     </div>
                 </div>
            )}
        </nav>
    );
};

export default Navbar;
