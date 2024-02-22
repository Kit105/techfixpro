import { Link } from "react-router-dom";
import { LiaSearchengin } from "react-icons/lia";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import heroImg from "../img/hero2.svg";

const Public = () => {

    const content = (
        <section className="public">
            <header className="sticky top-0 z-50">
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a href="#why-us">Why Choose Us?</a></li>
                                <li><a href="#services">Our Services</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <button className="btn btn-ghost text-3xl"><LiaSearchengin /> techFix Pro</button>
                    </div>
                    <div className="navbar-end">

                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="mx-5 theme-controller" value="emerald" />

                            {/* sun icon */}
                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                        <Link to="/login" className="btn btn-primary btn-md mx-5" >Employee Login</Link>

                    </div>
                </div>
            </header>
            <main className="public__main relative">
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={heroImg} alt="hero" className="w-96 h-96" />
                        <div>
                            <h1 className="text-5xl font-bold">The easiest way to fix your tech problems.</h1>
                            <p className="py-6">At techfix pro, we're dedicated to providing top-notch tech repair services to our valued customers. From smartphones to laptops, tablets to gaming consoles, we've got you covered. Our team of skilled technicians is committed to delivering fast and reliable solutions to all your tech woes.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>

                <section id='why-us' className="container mx-auto pl-5 my-32">
                    <h2 className="text-4xl font-bold text-center py-10">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Expert Technicians</h2>
                                <p>Our team consists of highly skilled technicians with years of experience in the tech repair industry.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Quick Turnaround</h2>
                                <p>We understand the importance of your devices. That's why we strive to provide fast and efficient repair services, minimizing downtime.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Quality Assurance</h2>
                                <p>Rest assured, we use only high-quality parts and components in our repairs, ensuring optimal performance and longevity.</p>

                            </div>
                        </div>

                    </div>

                </section>

                <section id='services' className="container mx-auto pl-5 my-32">
                    <h2 className="text-4xl font-bold text-center py-10">Our Services</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Smartphone Repair</h2>
                                <p>Cracked screen? Battery issues? We'll have your smartphone looking and functioning like new in no time.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Computer & Laptop Repair</h2>
                                <p>Whether it's a software glitch or a hardware malfunction, our experts will diagnose and fix the problem efficiently.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Tablet & iPad Repair</h2>
                                <p>Don't let a damaged tablet disrupt your workflow. Bring it to us, and we'll restore it to its former glory.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Gaming Console Repair</h2>
                                <p>Game on! We specialize in repairing all major gaming consoles, so you can get back to conquering virtual worlds.</p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Home Appliances Repair</h2>
                                <p>
                                    From refrigerators to washing machines, our technicians are equipped to handle all your home appliance repair needs.
                                </p>

                            </div>
                        </div>
                        <div className="card w-auto bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Other Services</h2>
                                <p>
                                    We also offer a range of other services, including data recovery, virus removal, and software installation.
                                </p>

                            </div>
                        </div>
                    </div>
                </section>

                <section id='contact' className="container mx-auto pl-5 my-32">
                    <h2 className="text-4xl font-bold text-center py-10">Contact Us</h2>
                    <p className="text-center mb-10">Ready to get your tech woes fixed? Feel free to reach out to us. Our friendly team is always ready to help.</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                        <div className="card bg-base-300 rounded-box">
                            <div className="card-body">
                                <h2 className="card-title">Reach Us</h2>
                                <h3 className="text-primary">Address</h3>
                                <p>123 Main Street, City, State, Zip</p>
                                <h3 className="text-primary">Phone</h3>
                                <p>(123) 456-7890</p>
                                <h3 className="text-primary">Email</h3>
                                <p>
                                    <a href="mailto:info@techfixpro.com">info@techfixpro.com</a>
                                </p>
                                <h3 className="text-primary">Business Hours</h3>
                                <p>Mon - Fri: 9:00 AM - 6:00 PM <br /> Sat - Sun: 10:00 AM - 4:00 PM</p>

                            </div>
                        </div>
                        <div className="card bg-base-300 rounded-box">
                            <div className="card-body">
                                <h2 className="card-title">Send Us a Message</h2>
                                <form action="">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" placeholder="John Doe" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="text" placeholder="johndoe@google.com" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Message</span>
                                        </label>
                                        <textarea placeholder="Write a message" className="textarea h-24 textarea-bordered"></textarea>
                                        <button className="btn btn-primary mt-5">Send</button>
                                        <button className="btn btn-ghost mt-5">Clear</button>
                                        <div className="divider"></div>
                                        <p className="text-center">We'll get back to you as soon as possible.</p>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>


                </section>

            </main>
            <footer>
                <footer className="footer footer-center p-10 bg-primary text-primary-content">
                    <aside>
                    <LiaSearchengin className="text-5xl" />
                        <p className="font-bold">
                            Techfix Pro Ltd. <br /> Fixing your tech problems since 2004.
                        </p>
                        <p>Copyright © 2024 - All right reserved</p>
                    </aside>
                    <nav>
                        <div className="grid grid-flow-col gap-4">
                            <button><TiSocialTwitter className="text-3xl" /></button>
                            <button><TiSocialFacebook className="text-3xl" /></button>
                            <button><TiSocialYoutube className="text-3xl" /></button>
                            <button><TiSocialInstagram className="text-3xl" /></button>
                            
                        </div>
                    </nav>
                </footer>
            </footer>
        </section>
    );
    return content;
};
export default Public;
