import Header from '../../Layout/components/header/index'

function HeaderOnly({children}){
    return(
        <div className='wrapper'>
            <Header/>
            <div className='container'>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default HeaderOnly