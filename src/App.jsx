import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useMotionTemplate,
  useMotionValueEvent,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "lenis/dist/lenis.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);
  const [bgColor, setBgColor] = useState("bg-neutral-900");
  const [gridVisible, setGridVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Initialize Lenis with proper cleanup
  useEffect(() => {
    let lenis;

    try {
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        smoothTouch: false,
      });

      // Listen for the scroll event and log the event data
      // lenis.on("scroll", (e) => {
      //   console.log(e);
      // });

      console.log("Lenis initialized successfully");
    } catch (error) {
      console.error("Error initializing Lenis:", error);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        console.log("Lenis destroyed");
      }
    };
  }, []);

  return (
    <>
      <div
        className={`${bgColor} min-h-screen w-full grid place-content-center transition-colors relative z-1 overflow-hidden`}
      >
        <LayoutGroup>
          {gridVisible && (
            <InteractiveOverlay
              key={location.pathname} // Unique key for re-rendering
            />
          )}

          <AnimatePresence mode="sync">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/title"
                element={<Title setBgColor={setBgColor} />}
              />
              <Route
                path="/content"
                element={
                  <Content
                    setGridVisible={setGridVisible}
                    setBgColor={setBgColor}
                  />
                }
              />
              <Route
                path="/example"
                element={
                  <Example
                    setBgColor={setBgColor}
                    setGridVisible={setGridVisible}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
}

const Welcome = () => {
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();
  return (
    <motion.div
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
      className="flex flex-col justify-center items-center w-auto h-auto gap-8"
    >
      <motion.svg
        layoutId="redux-logo"
        onClick={() => {
          navigate("/title");
          setShowTitle(false);
        }}
        whileHover={{
          scale: 1.1,
          y: 10,
          transition: { duration: 0.2, type: "spring", stiffness: 200 },
        }}
        whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
        className="w-30 h-30 hover:bg-neutral-200 rounded-full fill-[#764ABC] cursor-pointer"
        initial={{
          scale: 0.8,
          y: 100,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          y: -50,
          transition: {
            duration: 0.4,
          },
        }}
        transition={{
          default: {
            duration: 0.8,
            ease: "easeInOut",
          },
          scale: { duration: 0.3 },
          delay: 3,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="100px"
        height="100px"
        viewBox="0 -6 256 256"
        preserveAspectRatio="xMidYMid"
      >
        <motion.path
          d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895.326 4.887 2.28 9.122 5.212 12.054-11.076 21.828-28.016 37.791-53.426 51.148-17.266 9.122-35.183 12.38-53.1 10.1-14.66-1.955-26.062-8.47-33.23-19.222-10.424-15.963-11.401-33.23-2.605-50.496 6.19-12.38 15.962-21.502 22.152-26.063-1.303-4.235-3.258-11.402-4.235-16.614-47.237 34.207-42.35 80.468-28.016 102.295 10.75 16.29 32.577 26.389 56.684 26.389 6.515 0 13.03-.652 19.546-2.28 41.699-8.145 73.299-32.905 91.216-69.718zm57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176 16.288 10.751 28.016 24.76 34.531 41.7 5.538 13.683 5.212 27.04-.652 38.443-9.121 17.266-24.432 26.714-44.63 26.714-13.031 0-25.41-3.91-31.926-6.842-3.583 3.258-10.099 8.47-14.66 11.729 14.009 6.515 28.343 10.099 42.025 10.099 31.274 0 54.404-17.267 63.2-34.533 9.447-18.896 8.795-51.474-15.637-79.165zM69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325-13.357-22.153-18.895-46.26-16.94-72.323 1.302-19.547 7.818-36.488 19.22-50.497 9.447-12.054 27.69-17.918 40.07-18.243 34.531-.652 49.19 42.351 50.168 59.618 4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451-14.985 41.7-5.212 81.771 13.031 113.372-1.628 2.28-2.606 5.864-2.28 9.448z"
          stroke="#764ABC"
          strokeWidth={2}
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut" },
            fillOpacity: { delay: 1, duration: 1 },
          }}
        />
      </motion.svg>

      <AnimatePresence>
        {showTitle && (
          <motion.div
            layoutId="title"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            className="text-neutral-200 font-[Quicksand] text-lg"
          >
            Press to explore{" "}
            <motion.span className="text-[#764ABC] text-xl inline-block">
              {["R", "e", "d", "u", "x"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.3,
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Title = ({ setBgColor }) => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        layoutId="title"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.7,
              delayChildren: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="text-violet-100 font-[Quicksand] flex gap-3 items-center max-w-320 flex-wrap justify-center"
      >
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          What is Redux?
        </motion.h3>
        <div className="">•</div>
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          Why Use Redux?
        </motion.h3>
        <div className="">•</div>
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          Core Principles of Redux
        </motion.h3>
        <div className="">•</div>
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          Redux Flow
        </motion.h3>
        <div className="">•</div>
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          Redux Building Blocks
        </motion.h3>
        <div className="">•</div>
        <motion.h3
          variants={fadeIn}
          className="text-lg rounded-full py-2 px-3 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-default"
        >
          Example / Redux with React
        </motion.h3>
        <motion.button
          whileHover={{
            scale: 1.1,
            opacity: 1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
            },
            visible: {
              opacity: 0.6,
              y: 0,
              transition: {
                delay: 4.8,
                duration: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit={"hidden"}
          onClick={() => {
            navigate("/content");
            setBgColor("bg-neutral-200");
          }}
          className="bg-[#5c339d] p-4 rounded-full text-neutral-200 font-[Quicksand] text-md flex items-center justify-center gap-1 cursor-pointer"
        >
          <IoIosArrowForward size={16} />
        </motion.button>
      </motion.div>
    </>
  );
};

const Content = ({ setGridVisible, setBgColor }) => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log(latest);
  // });

  useEffect(() => {
    try {
      setGridVisible(true);
      console.log("Content component mounted, theme:", isOpen);

      // Ensure smooth scrolling is working
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error in Content component useEffect:", error);
    }
  }, [setGridVisible, isOpen]);

  return (
    <motion.div
      layoutId="main-container"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className="flex z-4 relative"
    >
      <motion.div
        style={{
          scaleY: scrollYProgress,
        }}
        className="fixed top-0 w-1  bg-neutral-700 h-screen origin-top"
      ></motion.div>
      <motion.div
        className={`${
          isOpen ? "text-neutral-100" : "text-neutral-800"
        } font-[Quicksand] text-lg min-h-screen lg:w-160 sm:w-80 p-18 ${
          isOpen ? "bg-neutral-800/40" : "bg-neutral-100"
        }  ${
          isOpen ? "shadow-neutral-400/40 shadow-sm" : "shadow-xl"
        } flex flex-col mt-24 gap-2 transition-colors `}
      >
        {/* logo */}
        <motion.div className="flex flex-col justify-center items-center w-auto h-auto gap-8">
          <motion.svg
            layoutId="redux-logo"
            whileHover={{
              scale: 1.1,
              y: 10,
              transition: { duration: 0.2, type: "spring", stiffness: 200 },
            }}
            whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            className="w-30 h-30 rounded-full fill-[#764ABC] cursor-pointer"
            initial={{
              scale: 0.8,
              y: 100,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -50,
              transition: {
                duration: 0.4,
              },
            }}
            transition={{
              default: {
                duration: 0.8,
                ease: "easeInOut",
              },
              scale: { duration: 0.3 },
              delay: 5,
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 -6 256 256"
            preserveAspectRatio="xMidYMid"
          >
            <motion.path
              d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895.326 4.887 2.28 9.122 5.212 12.054-11.076 21.828-28.016 37.791-53.426 51.148-17.266 9.122-35.183 12.38-53.1 10.1-14.66-1.955-26.062-8.47-33.23-19.222-10.424-15.963-11.401-33.23-2.605-50.496 6.19-12.38 15.962-21.502 22.152-26.063-1.303-4.235-3.258-11.402-4.235-16.614-47.237 34.207-42.35 80.468-28.016 102.295 10.75 16.29 32.577 26.389 56.684 26.389 6.515 0 13.03-.652 19.546-2.28 41.699-8.145 73.299-32.905 91.216-69.718zm57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176 16.288 10.751 28.016 24.76 34.531 41.7 5.538 13.683 5.212 27.04-.652 38.443-9.121 17.266-24.432 26.714-44.63 26.714-13.031 0-25.41-3.91-31.926-6.842-3.583 3.258-10.099 8.47-14.66 11.729 14.009 6.515 28.343 10.099 42.025 10.099 31.274 0 54.404-17.267 63.2-34.533 9.447-18.896 8.795-51.474-15.637-79.165zM69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325-13.357-22.153-18.895-46.26-16.94-72.323 1.302-19.547 7.818-36.488 19.22-50.497 9.447-12.054 27.69-17.918 40.07-18.243 34.531-.652 49.19 42.351 50.168 59.618 4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451-14.985 41.7-5.212 81.771 13.031 113.372-1.628 2.28-2.606 5.864-2.28 9.448z"
              stroke="#764ABC"
              strokeWidth={2}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                pathLength: { duration: 2.5, ease: "easeInOut" },
                fillOpacity: { delay: 1, duration: 1 },
              }}
            />
          </motion.svg>
        </motion.div>

        {/* title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          What is Redux?
        </motion.h1>

        {/* content */}
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-lg rounded-full py-2 px-3 "
        >
          Redux is a <span className="font-bold">state management library</span>{" "}
          for JavaScript apps — especially useful in React. Imagine your app is
          like a big machine with many moving parts. As it grows, keeping track
          of the state (like user data, UI status, etc.) across different
          components can get messy.
        </motion.h3>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Redux helps you:
        </motion.h1>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              Store all your app's state in one central place (called the
              store).
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              Predict what happens in your app, since the state updates in a
              clear, consistent way.
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>Make debugging and testing easier.</li>
          </ul>
        </Reveal>

        {/* principles */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Three Core Principles:
        </motion.h1>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>Single Source of Truth - One store holds all the state.</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              State is Read-Only - You can't directly change the state. You must
              dispatch an action.
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              Changes are Made with Pure Functions - These are called reducers
              and they decide how the state updates.
            </li>
          </ul>
        </Reveal>

        {/* flow */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Redux Flow Diagram:
        </motion.h1>
        <Reveal delay={0.1}>
          <img
            src="/diagram.jpg"
            className="hover:scale-150 transition-transform rounded-lg"
          />
        </Reveal>

        {/* building */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Key Redux Building Blocks:
        </motion.h1>
        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Store:</b> The single source of truth that holds the entire
              state tree of your application. It's created using the{" "}
              <code className="text-red-500">createStore</code> function.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Action:</b> Plain JavaScript objects that represent "what
              happened" in the app. They must have a type property and may
              include additional data.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Reducer:</b> Pure functions that specify how the application's
              state changes in response to actions. Reducers take the previous
              state and an action, and return the next state without modifying
              the previous state.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Dispatch:</b> The method used to send actions to the store,
              triggering state changes.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Selectors:</b> Functions that extract specific pieces of data
              from the store state, allowing components to get only the data
              they need.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="list-disc list-inside">
            <li>
              <b>Middleware:</b> Extends Redux with custom functionality,
              sitting between dispatching an action and the moment it reaches
              the reducer. Common uses include logging, crash reporting, async
              operations, and routing.
            </li>
          </ul>
        </Reveal>

        <motion.button
          whileHover={{
            scale: 1.1,
            opacity: 1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
            },
            visible: {
              opacity: 0.6,
              y: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => {
            navigate("/example");
            setBgColor("bg-neutral-200");
          }}
          className="bg-[#5c339d] p-4 rounded-full text-neutral-200 font-[Quicksand] text-md flex items-center justify-center gap-1 cursor-pointer mt-8"
        >
          Example
          <IoIosArrowForward size={16} />
        </motion.button>

        {/* <Reveal delay={0.1}>
          client, server, and native environments, and are easy to test. On top
          of that, it provides a great developer experience, such as live code
          editing combined with a time traveling debugger.
        </Reveal>
        <Reveal delay={0.1}>
          client, server, and native environments, and are easy to test. On top
          of that, it provides a great developer experience, such as live code
          editing combined with a time traveling debugger.
        </Reveal>
        <Reveal delay={0.1}>
          client, server, and native environments, and are easy to test. On top
          of that, it provides a great developer experience, such as live code
          editing combined with a time traveling debugger.
        </Reveal>
        <Reveal delay={0.1}>
          client, server, and native environments, and are easy to test. On top
          of that, it provides a great developer experience, such as live code
          editing combined with a time traveling debugger.
        </Reveal>
        <Reveal delay={0.1}>
          <div className=" overflow-hidden">
            <img src="/pic.jpg" />
          </div>
        </Reveal> */}
        {/* <ScrollReveal text="client, server, and native environments, and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger." /> */}
      </motion.div>
    </motion.div>
  );
};

const Example = ({ setBgColor, setGridVisible }) => {
  const { scrollYProgress } = useScroll();
  const isOpen = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  useEffect(() => {
    setGridVisible(true);
    const lenis = new Lenis({
      autoRaf: true,
    });
    lenis.scrollTo(0, { duration: 1.5 });
    return () => lenis.destroy();
  }, []);

  return (
    <div className="flex z-2">
      <motion.div
        style={{
          scaleY: scrollYProgress,
        }}
        className={`fixed top-0 w-1 ${
          isOpen ? "bg-neutral-400/40" : "bg-neutral-500"
        } h-screen origin-top rounded-full`}
      ></motion.div>
      <div
        className={`${
          isOpen ? "text-neutral-100" : "text-neutral-800"
        } font-[Quicksand] text-lg h-[460vh] lg:w-160 sm:w-80 p-18 ${
          isOpen ? "bg-neutral-800/40" : "bg-neutral-100"
        }  ${
          isOpen ? "shadow-neutral-400/40 shadow-sm" : "shadow-xl"
        } flex flex-col mt-24 gap-2 transition-colors `}
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Theme Switcher
        </motion.h1>
        <Reveal>
          <span className="font-[500]">Overview:</span>
        </Reveal>
        <Reveal>
          To demonstrate Redux in a practical and visual way, we implemented a
          Theme Switcher component within the same presentation page. This
          example showcases how Redux can be used to manage UI state across the
          application in a predictable and centralized manner.
        </Reveal>
        <Reveal>
          <span className="font-[500]">What It Does: </span>
        </Reveal>
        <Reveal>
          The component allows users to toggle between{" "}
          <code className="text-red-400">light</code> and{" "}
          <code className="text-red-400">dark</code> themes. The current theme
          is stored in a Redux slice and updated via dispatched actions. UI
          styling adapts automatically based on the selected theme.
        </Reveal>
        <Reveal>
          <span className="font-[500]">How It Works: </span>
        </Reveal>
        <Reveal>
          <li>Redux installation: </li>
          <div className={`bg-amber-200 w-full rounded-md px-2 `}>
            <code className={`${isOpen ? "text-neutral-800" : ""}`}>
              npm install @reduxjs/toolkit react-redux
            </code>
          </div>
        </Reveal>
        <Reveal>
          <li>
            Creating a Redux store inside{" "}
            <code className="text-red-400 bg-neutral-200">
              src/redux/store.js
            </code>
            :
          </li>
        </Reveal>
        <Reveal>
          <div className="">
            <img src="/store.png" />
          </div>
        </Reveal>
        <Reveal>
          Now let's see what happening in this{" "}
          <code className="text-red-400 bg-neutral-200">themeSlice.js</code>
        </Reveal>
        <Reveal>
          <img src="/initial.png" className="w-full h-auto" />
        </Reveal>
        <Reveal>
          We start by defining the initial state of our theme, which is set to{" "}
          <code className="text-red-400 bg-neutral-200">false</code>. in this
          case, we are gonna be using it as a boolean value to toggle between
          dark and light mode. The initial state can be set to any value.
        </Reveal>
        <Reveal>
          <img src="/function.png" className="w-full h-auto" />
        </Reveal>
        <Reveal>
          We define our reducer function, which takes the current state and an
          action as arguments. The reducer checks the action type and updates
          the state accordingly. In this case, when the action type is{" "}
          <code className="text-red-400 bg-neutral-200">TOGGLE_THEME</code>, it
          toggles the theme state between true and false.
        </Reveal>
        <Reveal>
          <img src="/switch.png" className="w-full h-auto" />
        </Reveal>
        <Reveal>
          Inside our reducer function, we define the{" "}
          <code className="text-red-400 bg-neutral-200">toggleTheme</code>{" "}
          action creator. This function returns an action object with the type{" "}
          <code className="text-red-400 bg-neutral-200">TOGGLE_THEME</code>.
          This action will be dispatched to the Redux store to trigger a state
          update.
        </Reveal>
        <Reveal>
          <img src="/provider.png" className="w-full" />
        </Reveal>
        <Reveal>
          Next, we need to wrap our application with the{" "}
          <code className="text-red-400 bg-neutral-200">Provider</code>{" "}
          component from React Redux. This allows us to access the Redux store
          in any component. We import the{" "}
          <code className="text-red-400 bg-neutral-200">store</code> we created
          earlier and pass it as a prop to the{" "}
          <code className="text-red-400 bg-neutral-200">Provider</code>.
        </Reveal>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          How to implement our state:
        </motion.h1>
        <Reveal>
          Now that we set up our Redux store and theme slice, we can implement
          the theme switcher functionality in our component.
        </Reveal>
        <Reveal>
          We create a Card component that will serve as our theme switcher.
          Inside the component, we use the{" "}
          <code className="text-red-400">useSelector</code> hook to access the
          current theme state from the Redux store. We also use the{" "}
          <code className="text-red-400">useDispatch</code> hook to dispatch
          actions to toggle the theme state. Here's the implementation:
        </Reveal>
        <Reveal>
          <img src="/card.png" alt="" />
        </Reveal>
        <Reveal>
          We can now use <code className="text-red-400">setIsOpen</code>{" "}
          function to toggle the theme state when a certain event occurs.
        </Reveal>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              },
            },
          }}
          className="text-3xl rounded-full py-2 px-3 "
        >
          Final Example:
        </motion.h1>

        <Card setBgColor={setBgColor} />
        <motion.button
          whileHover={{
            scale: 1.1,
            opacity: 1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
            },
            visible: {
              opacity: 0.6,
              y: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => {
            navigate("/content");
          }}
          className="bg-[#5c339d] p-4 rounded-full text-neutral-200 font-[Quicksand] text-md flex items-center justify-center gap-1 cursor-pointer mt-8"
        >
          <IoIosArrowForward size={16} className="rotate-180" />
          <span>Back</span>
        </motion.button>
      </div>
    </div>
  );
};

const Card = ({ setBgColor }) => {
  const isOpen = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const setIsOpen = () => {
    dispatch({ type: "TOGGLE_THEME" });
    console.log(isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setBgColor("bg-neutral-900");
    } else {
      setBgColor("bg-neutral-200");
    }
  }, [isOpen]);

  return (
    <div
      className={`w-100 h-100 ${
        isOpen ? "bg-neutral-800/60" : ""
      } place-self-center place-content-center rounded-xl transition-colors`}
    >
      <div
        className={`w-96 h-96 ${
          isOpen ? "bg-neutral-800" : ""
        } place-self-center rounded-xl shadow-xl hover:scale-105 transition-transform grid place-content-center `}
      >
        <div
          onClick={setIsOpen}
          className={`w-50 h-20 ${
            isOpen ? "bg-neutral-700" : "bg-neutral-300"
          } rounded-full flex items-center px-1 ${
            isOpen ? "justify-end" : "justify-start"
          } pointer-cursor shadow-neutral-400/60 transition-colors`}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.2,
            }}
            className={`w-18 h-18 rounded-full ${
              isOpen ? "bg-neutral-400" : "bg-violet-400"
            } shadow-lg transition-colors`}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

const Reveal = ({ children, delay = 0.1 }) => {
  const isOpen = useSelector((state) => state.theme.theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay,
        }}
        className={`${
          isOpen ? "bg-neutral-900" : "bg-neutral-200/20"
        } p-2 transition-transform hover:scale-105 border-1 ${
          isOpen ? "border-neutral-900" : "border-neutral-200"
        } `}
      >
        {children}
      </motion.div>
    </>
  );
};

const ScrollReveal = ({ text }) => {
  const container = useRef(null);
  const totalChars = text.length;
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"], //container enter/leave
  });
  return (
    <>
      <div
        ref={container}
        className=" flex items-center justify-center w-auto bg-amber-300 "
      >
        <div className="text-lg text-neutral-900w-30">
          {text.split("").map((char, i) => {
            const start = i / totalChars;
            const end = (i + 1) / totalChars;
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            return (
              <motion.span key={i} style={{ opacity }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </div>
      </div>
    </>
  );
};

const GridOverlay = ({
  color = "rgb(255, 255, 255, 0.8)",
  spacing = 20,
  lineWidth = 1,
  zIndex = 0,
  className = "",
  enableVertical = true,
  enableHorizontal = true,
}) => {
  const isOpen = useSelector((state) => state.theme.theme);

  const gridStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: zIndex,
    backgroundImage: `
      ${
        enableVertical
          ? `linear-gradient(to right, ${
              isOpen ? "rgb(0, 0, 0, 0.2)" : "rgb(255, 255, 255, 0.8)"
            } ${lineWidth}px, transparent ${lineWidth}px)`
          : ""
      }
      ${enableVertical && enableHorizontal ? ", " : ""}
      ${
        enableHorizontal
          ? `linear-gradient(to bottom, ${
              isOpen ? "rgb(0, 0, 0, 0.2)" : "rgb(255, 255, 255, 0.8)"
            } ${lineWidth}px, transparent ${lineWidth}px)`
          : ""
      }
    `,
    backgroundSize: `${spacing}px ${spacing}px`,
    transition: "background-image 5s ease",
  };

  return <div className={className} style={gridStyle}></div>;
};

const InteractiveOverlay = ({
  spacing = 80,
  lineWidth = 1,
  zIndex = 0,
  className = "",
}) => {
  const isOpen = useSelector((state) => state.theme.theme);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    function updateDimensions() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const columns = Math.ceil(dimensions.width / spacing) + 1;
  const rows = Math.ceil(dimensions.height / spacing) + 1;
  const totalSquares = columns * rows;

  const gridSquares = [];
  for (let i = 0; i < totalSquares; i++) {
    gridSquares.push(i);
  }
  return (
    <>
      <div
        ref={containerRef}
        className={`absolute top-0 left-0 w-full h-full grid`}
        style={{
          zIndex: zIndex,
          gridTemplateColumns: `repeat(${columns}, ${spacing}px)`,
          gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
        }}
      >
        {gridSquares.map((div, i) => (
          <div
            key={i}
            className={`transition-all duration-200`}
            style={{
              width: `${spacing - lineWidth}px`,
              height: `${spacing - lineWidth}px`,
              backgroundColor: isOpen
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isOpen
                ? "rgba(0, 0, 0, 0.4)"
                : "rgba(200, 200, 200, 0.2)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isOpen
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.8)";
              e.target.style.transform = "scale(1)";
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default App;
