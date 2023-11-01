
import AppLogo from '../applogo/logo';
import Cityform from '../cityform/cityform';
import './appHeader.scss';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,NavbarMenu,NavbarMenuItem } from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa6";


function AppHeader(){

  const navigateToGithub = () => {

  }

  return (
    <>
      <Navbar className='azul' id="navbar">
        <NavbarBrand>
          <AppLogo></AppLogo>
        </NavbarBrand>
        <NavbarContent className='sm:flex gap-2 ancho' justify='start'>
          <NavbarItem className='w-[70%] md:w-full'>
            <Cityform></Cityform>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <a href='https://github.com/jesusMAes' target='_blank'>
              <Button isIconOnly aria-label="Github icon" className='bg-transparent rounded-full py-5' onClick={navigateToGithub}>
               <FaGithub className="text-4xl" ></FaGithub>
              </Button>
            </a>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default AppHeader;