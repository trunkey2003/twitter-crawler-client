import { useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  const [twitterLinkInput, setTwitterLinkInput] = useState("");

  return (
    <MainLayout>
      <div
        className="w-full h-[100vh] md:h-[80vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('/videos/home-bg-2.gif')" }}
      >
        <div className="h-full w-full absolute z-10 bg-black bg-opacity-80 flex flex-wrap justify-center py-[10vh] text-white">
          <div className="text-center">
            <h1 className="py-4 text-[50px] font-bold">
              Analyze your <span className="text-primary">Twitter</span> Post
              for better interaction
            </h1>
            <div
              className={`mx-auto mb-12 w-fit flex justify-center items-center relative`}
            >
              <input
                name="twitterLinkInput"
                className="border-b border-white bg-transparent h-[40px] w-[400px] w-full text-center min-w-[15vw] max-w-[60vw] focus:outline-none focus:scale-150 px-2 "
                value={twitterLinkInput}
                onChange={(e) => setTwitterLinkInput(e.target.value)}
              ></input>
            </div>
            <div className="relative py-16">
              <div className="absolute-center">
                <svg className="circle-svg" viewBox="0 0 500 500">
                  <defs>
                    <path
                      d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                      id="textcircle_top"
                    >
                      <animateTransform
                        attributeName="transform"
                        begin="0s"
                        dur="20s"
                        type="rotate"
                        from="0 250 250"
                        to="360 250 250"
                        repeatCount="indefinite"
                      />
                    </path>
                  </defs>
                  <text
                    className="circle-text fill-gray-300"
                    dy="70"
                    textLength="1220"
                  >
                    <textPath xlinkHref="#textcircle_top">
                      Analyze Your Twitter Post
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute-center">
                <div className="showreels-div">
                  {/* <img className="showreels-video animate-[spin_10s_linear_infinite] hover:cursor-pointer" src="/images/seo.webp"></img> */}
                  <img
                    className="absolute rounded-full hover:animate-[spin_10s_linear_infinite]"
                    alt="twitter"
                    src="/images/twitter.jpg"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
