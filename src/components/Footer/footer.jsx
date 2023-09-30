const Footer = () => {
    return (<>
        <div className="container-fluid bg-dark text-white p-5 mt-4">
            <div className="row">
                <div className="col-4">
                    <h3><b>MonShop listens to you!</b></h3>
                    <p>We always appreciate and look forward to receiving all feedback from customers to be able to upgrade our service and product experience even better.</p>
                </div>
                <div className="col-4">
                    <div className="d-flex" style={{ flexDirection: 'column' }}>
                        <div className="d-flex" style={{ alignItems: 'center' }}>
                            <img style={{ width: '30px', height: '40px' }} src="https://www.coolmate.me/images/footer/icon-hotline.svg" alt="" />
                            <div className="d-flex" style={{ flexDirection: 'column', justifyContent: 'center', margin: '5px 5px 5px 10px' }}>
                                <h6>Hotline</h6>
                                <p>1900 0001 (8:30-10:00)</p>
                            </div>
                        </div>
                        <div className="d-flex" style={{ alignItems: 'center' }}>
                            <img style={{ width: '30px', height: '40px' }} src="https://www.coolmate.me/images/footer/icon-email.svg" alt="" />
                            <div className="d-flex" style={{ flexDirection: 'column', justifyContent: 'center', margin: '5px 5px 5px 10px' }}>
                                <h6>Email</h6>
                                <p>Monshopnehihi@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="d-flex" style={{ justifyContent: 'center' }}>
                        <img style={{ width: '70px', height: '70px', marginRight: '10px' }} src="https://mcdn.coolmate.me/image/June2023/mceclip1_43.png" alt="" />
                        <img style={{ width: '70px', height: '70px', marginRight: '10px' }} src="https://mcdn.coolmate.me/image/June2023/mceclip2_68.png" alt="" />
                        <img style={{ width: '70px', height: '70px', marginRight: '10px' }} src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png" alt="" />
                        <img style={{ width: '70px', height: '70px' }} src="https://www.coolmate.me/images/footer/icon-instar.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Footer;