import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    HeaderGlobalAction,
    HeaderGlobalBar,
    Header,
    HeaderPanel,
    HeaderName,

} from 'carbon-components-react'

import { onLogout } from '../actions/index'
import { connect } from 'react-redux'

import { WrapperModal, TitleBar, WrapperMenu, MenuContainer, MenuItem, ItemSideBar } from '../assets/styles/ModalStyle'

import { Search20, AppSwitcher20, Notification20, UserAvatarFilled32, Report16, Catalog16 } from '@carbon/icons-react'

const SideBar = ({ isLogged, onLogout }) => {
    const [able, setAble] = useState(false)

    let handleNavbar = () => {
        !able ? setAble(true) : setAble(false)
    }
    return (
        <Header style={{ borderBottom: 0 }}>
            <HeaderName prefix="IBM" style={{ background: 'black', borderRight: '1px solid #eee', margin: 0 }}>
                <Link to="/init" style={{ textDecoration: 'none', color: 'white' }}>
                    [Brokers web]
                </Link>
            </HeaderName>
            <WrapperMenu>
                <MenuContainer>
                    <Link to="/myforms" style={{ textDecoration: 'none', color: 'white' }}>
                        <MenuItem>
                            <Catalog16 /> Listar formas
                        </MenuItem>
                    </Link>
                    <Link to="/statistics" style={{ textDecoration: 'none', color: 'white' }}>
                        <MenuItem>
                            <Catalog16 /> Estadisticas
                        </MenuItem>
                    </Link>
                </MenuContainer>
            </WrapperMenu>
            <HeaderGlobalBar style={{ background: 'black' }}>
                <HeaderGlobalAction aria-label="Search" >
                    <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                    aria-label="Notifications"
                    onClick={() => handleNavbar()}
                >
                    <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                    aria-label="App Switcher"
                    isActive={able}
                    onClick={() => handleNavbar()}
                >
                    <AppSwitcher20 />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <HeaderPanel aria-label="Header Panel" expanded={able}>
                <WrapperModal>
                    <UserAvatarFilled32 style={{ fontSize: 20, color: 'white' }} />
                    <TitleBar>{isLogged.name}</TitleBar>
                </WrapperModal>
                <WrapperModal style={{justifyItems: 'flex-start', alignItems: 'flex-start'}}>
                    <ItemSideBar>Perfil</ItemSideBar>
                    <ItemSideBar>Configuraciones</ItemSideBar>
                    <ItemSideBar
                        onClick={() => onLogout()}
                    >
                    Cerrar sesión
                    </ItemSideBar>
                </WrapperModal>
            </HeaderPanel>
        </Header>
    )
}

const mapDispatchToProps = {
    onLogout
}



export default connect(null, mapDispatchToProps)(SideBar)
