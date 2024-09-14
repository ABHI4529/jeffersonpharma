import ContactForm from "@/components/forms/contact-form";


export default function ContactSection() {
    return (
        <div className={"flex flex-col px-[4%] md:px-[8%] pb-20"}>
            <h1 className={"text-lg md:text-2xl font-bold"}>Get In Touch</h1>
            <p className={"text-xs max-w-72 md:text-sm text-muted-foreground"}>
                Your satisfaction is our priority. Feel free to reach out to us anytime — we're here to help
            </p>
            <div className={"flex flex-col md:flex-row gap-3 bg-[#f2f2f2] p-4 md:p-8 rounded-md mt-8 w-full"}>
                <div className={"flex gap-3 w-full"}>
                    <ContactForm/>
                </div>
                <span className={"h-0.5 w-40 my-8 md:my-0 md:h-52 md:w-0.5 bg-neutral-300 self-center mx-10"}/>
                <div className={"flex gap-3 flex-col w-full"}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.673556639365!2d79.05901307471848!3d21.180417382553426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4eb9bc7ca6143%3A0x988769d538bc0e3d!2sJefferson%20Impex%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1726304406532!5m2!1sen!2sin"
                        width="100%" height="100%"
                        className={"rounded-md"}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}