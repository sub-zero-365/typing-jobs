import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";
import { AnimatedSlideText } from '../components/Animated/animated.js';
import Heading from '../components/Heading';
import { Button } from "../components/ui/button.js";
import { Forward, Plus } from "lucide-react";
import { Link } from "react-router-dom";
const contents = [
    {
        title: "Upload Your Document",
        description: "Get started by uploading your document. We support various file formats for your convenience:",
        options: [
            {
                text: "Drag & Drop: Simply drag and drop your document file (e.g., PDF, DOCX, JPG, PNG) onto the designated area. This is the quickest way to upload!",
            },
            { text: "Browse Files: Click the \"Browse Files\" button and select your document from your computer. Perfect if you prefer a more traditional approach." },
            { text: "Upload from Cloud Storage (Optional): If you have your document stored in a cloud service like Google Drive or Dropbox, you might be able to connect your account and upload directly (availability depends on integration)." },
        ],
    },
    {
        title: "Customize Your Prints (Optional)",
        description: "Enhance your prints by adjusting some settings if needed:",
        options: [
            {
                text: "Single-sided or Double-sided Printing: Choose whether you want your document printed on one or both sides. Great for single-page documents or creating booklets with double-sided printing.",
            },
            { text: "Paper Selection: Select the paper type that best suits your needs. We offer options like regular copy paper for everyday documents, cardstock for presentations or flyers, photo paper for high-quality images, and even specialty papers like textured or colored options (availability may vary)." },
            { text: "Color or Grayscale: Choose between vibrant full-color printing for presentations or photos, or a cost-effective black and white (grayscale) option for text-heavy documents. Additionally, you might have the option to choose specific color modes like CMYK for professional printing." },
            { text: "Orientation: Specify portrait or landscape orientation for your document, especially important for photos or non-standard layouts." },
            { text: "Scaling & Margins: Fine-tune the scaling of your document to fit the selected paper size and adjust margins for optimal layout (advanced option)." },
        ],
    },
    {
        title: "Preview & Confirm (Optional)",
        description: "We offer a preview option for those who like to double-check before printing:",
        options: [
            { text: "Take a moment to review the document preview and printing selections to ensure everything looks exactly how you want it before placing your order. You can zoom in, rotate, and adjust the view of the preview for a closer look." },
            { text: "For certain file types like PDFs, you might be able to navigate through multiple pages within the preview." },
        ],
    },
    {
        title: "Submit Your Order & Secure Payment",
        description: "Once you're happy with your selections, finalize your order:",
        options: [
            { text: "Click the prominent \"Submit Order\" or \"Print Now\" button to proceed." },
            { text: "You'll be directed to our secure payment gateway to complete your order. We use industry-standard security measures to protect your financial information." },
            { text: "Choose your preferred payment method from various options like credit card, debit card, or online payment services (depending on availability)." },
            { text: "If you're a registered user, you might be able to apply any available discounts or loyalty points to your order during checkout." },
        ],
    }, {}
];


//     {
//         title: "First Step",
//         JSX:
//             <div className='space-y-4 pl-4  -translate-y-6'>
//                 <Heading className='font-black text-xl  uppercase text-blue-900'>Truck  Selection</Heading>
//                 <p className="mb-0 text-base font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatem harum accusamus quos dignissimos earum, assumenda modi veritatis provident ea, quod cumque porro nemo? Rerum, excepturi quisquam. Labore sapiente similique corrupti explicabo odio, obcaecati animi laborum sequi natus ipsa? Blanditiis dicta autem natus odit, totam neque ea eum impedit incidunt corporis. Ex ipsam nisi fugiat labore quibusdam magni explicabo fugit culpa unde sint excepturi eligendi quidem, sunt maiores. Voluptatem, veniam dolorem accusantium recusandae facilis voluptas ut ullam maxime cupiditate explicabo quae! Eligendi cum veniam sint fuga, molestias dicta at sit magnam dolores suscipit rerum iure expedita cumque quae ab itaque nostrum beatae facilis quasi? At, est et expedita nemo illum magni? Dolorem nesciunt laboriosam non totam fuga quam ab adipisci a magni odio veritatis reiciendis temporibus, iste quo aliquam soluta ut et sapiente dolores molestias saepe deserunt alias nam. Debitis pariatur magni aut perferendis modi doloribus nobis consequatur tempore enim!.</p>
//             </div>,
//         Icon: "https://img.freepik.com/free-vector/barcode-scanning-concept-illustration_335657-5637.jpg?t=st=1715686067~exp=1715689667~hmac=2646fc6d596e3d3e42af6255934578300f8c62c36cfd08812862a67d0453a1be&w=740",
//         value: 6564,
//         imageDescription: "https://img.freepik.com/free-vector/barcode-scanning-concept-illustration_335657-5637.jpg?t=st=1715686067~exp=1715689667~hmac=2646fc6d596e3d3e42af6255934578300f8c62c36cfd08812862a67d0453a1be&w=740"

//     },
//     {
//         title: "Second Step",
//         JSX:
//             <div className='space-y-4 pl-4  -translate-y-6'>
//                 <Heading className='font-black text-xl  uppercase text-blue-900'>Truck  Selection</Heading>
//                 <p className="mb-0 text-base font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatem harum accusamus quos dignissimos earum, assumenda modi veritatis provident ea, quod cumque porro nemo? Rerum, excepturi quisquam. Labore sapiente similique corrupti explicabo odio, obcaecati animi laborum sequi natus ipsa? Blanditiis dicta autem natus odit, totam neque ea eum impedit incidunt corporis. Ex ipsam nisi fugiat labore quibusdam magni explicabo fugit culpa unde sint excepturi eligendi quidem, sunt maiores. Voluptatem, veniam dolorem accusantium recusandae facilis voluptas ut ullam maxime cupiditate explicabo quae! Eligendi cum veniam sint fuga, molestias dicta at sit magnam dolores suscipit rerum iure expedita cumque quae ab itaque nostrum beatae facilis quasi? At, est et expedita nemo illum magni? Dolorem nesciunt laboriosam non totam fuga quam ab adipisci a magni odio veritatis reiciendis temporibus, iste quo aliquam soluta ut et sapiente dolores molestias saepe deserunt alias nam. Debitis pariatur magni aut perferendis modi doloribus nobis consequatur tempore enim!.</p>
//             </div>,
//         Icon: "https://fwdexpresslogistics.com/wp-content/uploads/2020/06/icon-01.png",
//         value: 3552,
//         imageDescription: "https://img.freepik.com/free-vector/hand-drawn-hands-with-box-phone_23-2147673143.jpg?t=st=1715686326~exp=1715689926~hmac=a4537414460fb1083a8625fa96bb4ce597b077f0663a7b363fbde1623ef8ade5&w=740"
//     },

//     {
//         title: "Third Step",
//         JSX:
//             <div className='space-y-4 pl-4  -translate-y-6'>
//                 <Heading className='font-black text-xl  uppercase text-blue-900'>Truck  Selection</Heading>
//                 <p className="mb-0 text-base font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatem harum accusamus quos dignissimos earum, assumenda modi veritatis provident ea, quod cumque porro nemo? Rerum, excepturi quisquam. Labore sapiente similique corrupti explicabo odio, obcaecati animi laborum sequi natus ipsa? Blanditiis dicta autem natus odit, totam neque ea eum impedit incidunt corporis. Ex ipsam nisi fugiat labore quibusdam magni explicabo fugit culpa unde sint excepturi eligendi quidem, sunt maiores. Voluptatem, veniam dolorem accusantium recusandae facilis voluptas ut ullam maxime cupiditate explicabo quae! Eligendi cum veniam sint fuga, molestias dicta at sit magnam dolores suscipit rerum iure expedita cumque quae ab itaque nostrum beatae facilis quasi? At, est et expedita nemo illum magni? Dolorem nesciunt laboriosam non totam fuga quam ab adipisci a magni odio veritatis reiciendis temporibus, iste quo aliquam soluta ut et sapiente dolores molestias saepe deserunt alias nam. Debitis pariatur magni aut perferendis modi doloribus nobis consequatur tempore enim!.</p>
//             </div>,
//         Icon: "https://fwdexpresslogistics.com/wp-content/uploads/2020/06/icon-01.png",
//         value: 352,
//         imageDescription: "https://img.freepik.com/free-vector/truck-platooning-abstract-concept-vector-illustration-autonomous-driving-modern-logistics-technology-connectivity-electric-truck-driverless-vehicle-automated-highway-abstract-metaphor_335657-1772.jpg?t=st=1715686411~exp=1715690011~hmac=fa8de1e2de9e636a4bf3c0e20a3faa1985d44ca938c6357eb8c41b0c1658a50b&w=740"
//     },
//     {
//         title: "Fourth Step",
//         JSX:
//             <div className='space-y-4 pl-4  -translate-y-6'>
//                 <Heading className='font-black text-xl  uppercase text-blue-900'>Truck  Selection</Heading>
//                 <p className="mb-0 text-base font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatem harum accusamus quos dignissimos earum, assumenda modi veritatis provident ea, quod cumque porro nemo? Rerum, excepturi quisquam. Labore sapiente similique corrupti explicabo odio, obcaecati animi laborum sequi natus ipsa? Blanditiis dicta autem natus odit, totam neque ea eum impedit incidunt corporis. Ex ipsam nisi fugiat labore quibusdam magni explicabo fugit culpa unde sint excepturi eligendi quidem, sunt maiores. Voluptatem, veniam dolorem accusantium recusandae facilis voluptas ut ullam maxime cupiditate explicabo quae! Eligendi cum veniam sint fuga, molestias dicta at sit magnam dolores suscipit rerum iure expedita cumque quae ab itaque nostrum beatae facilis quasi? At, est et expedita nemo illum magni? Dolorem nesciunt laboriosam non totam fuga quam ab adipisci a magni odio veritatis reiciendis temporibus, iste quo aliquam soluta ut et sapiente dolores molestias saepe deserunt alias nam. Debitis pariatur magni aut perferendis modi doloribus nobis consequatur tempore enim!.</p>
//             </div>,
//         Icon: "https://fwdexpresslogistics.com/wp-content/uploads/2020/06/icon-01.png",
//         value: 882,
//         imageDescription: "https://img.freepik.com/free-vector/real-estate-abstract-concept-vector-illustration-real-estate-agency-residential-industrial-commercial-property-market-investment-portfolio-home-ownership-property-value-abstract-metaphor_335657-1967.jpg?t=st=1715686644~exp=1715690244~hmac=d631d43fd7421956cfbbffca9cec836921804b0103f2386779ab930a4fce1303&w=740"

//     }, {}

// ];
const HowItWorks = () => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = contents.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("lasted", latest)
        const cardsBreakpoints = contents.map((_, index) => index / cardLength);
        console.log("counted length", cardLength, cardsBreakpoints)
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                console.log("acc", acc)
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        console.log(closestBreakpointIndex, "close break point")
        setActiveCard(closestBreakpointIndex);
    });
    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    return (
        <div
            className="bg-white py-20 "
        >
            <div>

                <div className='sticky-- top-4rem-- max-w-5xl mx-auto'>
                    <Heading className='text-2xl mb-4 font-black uppercase text-start text-blue-800 '>
                        Working Process
                    </Heading>
                    <AnimatedSlideText inView
                        text="    we follow some steps to ensure you send your document correctly"
                        className='text-center text-blue-950 font-black mb-6 text-2xl lg:text-4xl max-w-4xl lg:mx-auto '>

                    </AnimatedSlideText>
                </div>
            </div>
            <motion.div className='grid grid-cols-1 relative h-[min(40rem,calc(100vh-4rem))] overflow-y-auto scrollto lg:grid-cols-12 max-w-6xl mx-auto px-4 items-start
            '
                // animate={{
                //     backgroundColor: backgroundColors[activeCard % backgroundColors.length],
                // }}
                ref={ref}
            >

                <div className='lg:col-span-8'>



                    <ol className="relative border-s border-gray-200 dark:border-gray-700 ">

                        {contents.map((arr, idx) => {
                            // if (idx+1 === contents.length) return
                            return (<motion.li
                                // initial={{
                                //     opacity: 0,
                                // }}
                                animate={{
                                    opacity: activeCard === idx ? 1 : 0.6,
                                }}
                                className="mb-5 ms-6 "
                                key={idx}
                            >
                                {
                                    contents.length - 1 == idx ? "" : <span className="absolute- text-white flex items-center top-4 justify-center size-6 shadow-sm rounded-full sticky -ml-[calc(1.5rem+0.75rem+0.5px)]  bg-blue-800 -start-3- ring-6 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        {idx + 1}
                                    </span>
                                }
                                <Heading className="-translate-y-6 font-bold text-2xl ">{arr.title}</Heading>
                                <ol className="list-disc space-y-2 divide-y pb-6 pl-4">
                                    {arr?.options?.map(opt => <li
                                        className=""
                                        key={opt.text}
                                    >{opt.text}</li>)}
                                </ol>
                                <p className="font-bold">{arr.description}</p>

                            </motion.li>)
                        })}
                    </ol>

                    {/* </TracingBeam> */}


                </div>

                <div className='hidden lg:block px-4 sticky top-16 lg:col-span-4'>
                    <div
                        className=' bg-black- min-h-56 -skew-x-6 grayscale-'
                    >

                        <AnimatedSlideText text={contents[activeCard].title || ""} key={contents[activeCard].title} className='text-4xl'></AnimatedSlideText>
                        {/* <img
                            src={contents[activeCard].title}
                            className=''
                        /> */}
                    </div>
                </div>
            </motion.div>
            <Link to="upload">
            <Button
                className="block sticky- btn bg-colorPrimary
            w-[min(420px,calc(100%-1rem))] px-0
            mx-auto font-bold text-sm z-50 h-14 lg:ml-auto lg:mr-4
            bottom-0 rounded-none   left-0 uppercase  text-center ">
                Get Started <span className="size-6 ml-2 inline-flex justify-center items-center rounded-full ring  place-items-center"><Forward size={15} className='inline-block' /></span>
            </Button>
            </Link>
            

        </div>
    )
}

export default HowItWorks