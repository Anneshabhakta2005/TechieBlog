import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const Events = () => {
    const events = [
        {
            title: "Webinar: Introduction to HTML",
            date: "February 10, 2025",
            time: "10:00 AM - 12:00 PM",
            description: "Join us for an introductory session on HTML where you'll learn the basics of structuring a webpage and creating content.",
            link: "/register"
        },
        {
            title: "Workshop: Advanced CSS techniques",
            date: "March 15, 2025",
            time: "2:00 PM - 4:00 PM",
            description: "Dive deep into advanced CSS techniques, including animations, transitions, and responsive design best practices.",
            link: "/register"
        },
    ];

    const [savedEvents, setSavedEvents] = React.useState(() => {
        return JSON.parse(localStorage.getItem('savedEvents') || '[]');
    });

    const handleSaveEvent = (eventId, e) => {
        e.preventDefault();
        let updated = [...savedEvents];
        if (updated.includes(eventId)) {
            updated = updated.filter(id => id !== eventId);
        } else {
            updated.push(eventId);
        }
        setSavedEvents(updated);
        localStorage.setItem('savedEvents', JSON.stringify(updated));
    };

    const isEventSaved = (eventId) => savedEvents.includes(eventId);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
            }
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent text-center"
            >
                Upcoming Events/Webinars
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-10 mx-4 sm:mx-8 md:mx-16 lg:mx-60 mb-20 ">
                {events.map((event, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{
                    y: -10,
                    boxShadow:
                        "0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative flex flex-col p-6 w-full sm:w-96 border-2 border-orange-300 dark:border-gray-700 rounded-xl shadow-xl bg-white dark:bg-gray-800 hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300 overflow-hidden"
                >
                    {/* Save/Bookmark Icon */}
                    <button
                        onClick={(e) => handleSaveEvent(event.title, e)}
                        aria-label={isEventSaved(event.title) ? "Remove from Saved Events" : "Save Event for Later"}
                        className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors ${isEventSaved(event.title) ? "text-orange-500" : "text-gray-400"}`}
                    >
                        <Bookmark className={`w-6 h-6 ${isEventSaved(event.title) ? "fill-orange-500" : "fill-none"}`} />
                    </button>

                    {/* theme-consistent hover overlay */}
                    <div className="absolute inset-0 bg-orange-100/20 dark:bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <motion.h2
                    className="text-2xl sm:text-3xl font-bold mb-6 px-2 py-1 rounded bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent text-center z-10"
                    >
                    {event.title}
                    </motion.h2>

                    <div className="space-y-4 z-10">
                    <p className="text-gray-700 dark:text-gray-400 transition-colors duration-300">
                        <strong className="text-orange-600 dark:text-orange-400 transition-colors duration-300">
                        Date:
                        </strong>{" "}
                        {event.date}
                    </p>
                    <p className="text-gray-700 dark:text-gray-400 transition-colors duration-300">
                        <strong className="text-orange-600 dark:text-orange-400 transition-colors duration-300">
                        Time:
                        </strong>{" "}
                        {event.time}
                    </p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300"
                    >
                        {event.description}
                    </motion.p>
                    </div>

                    <div className="mt-auto flex justify-center z-10 py-6">
                    <motion.a
                        href={event.link}
                        whileHover={{
                        scale: 1.05,
                        background: "linear-gradient(45deg, #ea580c, #d97706)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-60 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                        />
                        </svg>
                        Register Now
                    </motion.a>
                    </div>
                </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link to="/add-event">
                <motion.button
                    whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="px-8 py-4 text-lg sm:text-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                    </svg>
                    Add New Event
                </motion.button>
                </Link>
            </div>
            </div>



    );
}

export default Events;