import { Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "@/styles/EightPage.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const EightPage = () => {
    const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleNext = () => {
        setPositionIndex((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % 5);
            return updatedIndexes;
        });
    };

    const handlePrev = () => {
        setPositionIndex((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex - 1 + 5) % 5);
            return updatedIndexes;
        });
    };

    const images = [
        { src: "/images/image1.png", title: "Bojčin Forest, Serbia", description: "Path Of Peace" },
        { src: "/images/image2.png", title: "Mystic Valley, Norway", description: "Serenity Peak" },
        { src: "/images/image3.png", title: "Emerald Lake, Canada", description: "Nature's Haven" },
        { src: "/images/image4.png", title: "Skyfall Ridge, Iceland", description: "Ethereal Escape" },
        { src: "/images/image5.png", title: "Lunar Woods, Finland", description: "Whispering Pines" },
    ];

    const positions = ["center", "left", "left1", "right", "right1"];


    const imageVariants = {
        center: {
            x: "0%",
            z: 50,
            scale: 1,
            rotateY: 0, // Không xoay ở trung tâm
            opacity: 1,
            zIndex: 5,
        },
        left1: {
            x: "-40%",
            z: 20,
            scale: 0.8,
            rotateY: -30, // Xoay nhẹ sang trái
            opacity: 0.8,
            zIndex: 3,
        },
        left: {
            x: "-70%",
            z: 0,
            scale: 0.6,
            rotateY: -90, // Xoay nhiều hơn
            opacity: 0.4,
            zIndex: 1,
        },
        right: {
            x: "70%",
            z: 0,
            scale: 0.6,
            rotateY: 90, // Xoay sang phải
            opacity: 0.4,
            zIndex: 1,
        },
        right1: {
            x: "40%",
            z: 20,
            scale: 0.8,
            rotateY: 30,
            opacity: 0.8,
            zIndex: 3,
        },
    };
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const contentVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
    };

    return (
        <section className={styles.sevenSection}>
            <h1 className={styles.heading}>
                BLOG HAY MỖI TUẦN

            </h1>

            <div className={styles.slider}>
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className={styles.sliderItem}
                        initial="center"
                        animate={positions[positionIndex[index]]}
                        variants={imageVariants}
                        transition={{ duration: 0.5 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                    >
                        <motion.img
                            src={image.src}
                            className={styles.sliderImage}
                            style={{ width: "100%", height: "100%" }}
                        />
                        <motion.div
                            className={styles.overlay}
                            initial="hidden"
                            animate={hoveredIndex === index ? "visible" : "hidden"}
                            variants={overlayVariants}
                        >
                            <motion.div
                                className={styles.overlayContent}
                                initial="hidden"
                                animate={hoveredIndex === index ? "visible" : "hidden"}
                                variants={contentVariants}
                            >
                                <h3 className={styles.overlayTitle}>{image.title}</h3>
                                <p className={styles.overlayDescription}>{image.description}</p>
                                <Link to={'/'}>
                                    <button className={styles.readMoreButton}><span className={styles.readMoreText}>READ MORE</span></button>

                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
                <div className={styles.buttonWrapper}>
                    <button onClick={handlePrev} className={styles.prevButton}>
                        Previous
                    </button>
                    <button onClick={handleNext} className={styles.nextButton}>
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EightPage;