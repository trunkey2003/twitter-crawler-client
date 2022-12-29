import { useState } from "react";
import TwitterLinkInput from "../components/Input/TwitterLinkInput";
import AnalyzeDataKVBox from "../components/KeyValueBox/AnalyzeDataKVBox";
import {
  getFormattedDatetimeString,
  isValidatedTwitterPostLink,
} from "../function";
import Axios from "../function/Axios";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  const [twitterLinkInput, setTwitterLinkInput] = useState("");
  const [errorValidation, setErrorValidation] = useState({});
  const [twitterStatistics, setTwitterStatistics] = useState({});
  const [loadingGetResult, setLoadingGetResult] = useState(false);
  const [loadingSyncData, setLoadingSyncData] = useState(false);

  const handleValidateTwitterLink = () => {
    const error = {};
    let isValid = true;
    if (twitterLinkInput === "") {
      error.twitterLinkInput = "Please enter your twitter post link";
      isValid = false;
    } else if (!isValidatedTwitterPostLink(twitterLinkInput)) {
      error.twitterLinkInput = "Please enter a valid twitter post link";
      isValid = false;
    }
    setErrorValidation(error);
    return isValid;
  };

  const handleTwitterLinkInputSubmit = () => {
    if (!handleValidateTwitterLink()) return;
    setLoadingGetResult(true);
    handleGetTwitterAnalysis(twitterLinkInput).finally(() =>
      setLoadingGetResult(false)
    );
  };

  const handleGetTwitterAnalysis = (twitterPostUrl) => {
    const queriesParams = new URLSearchParams({
      twitterPostUrl: twitterPostUrl,
    }).toString();
    return Axios.get("/api/v1/twitter/getTwitterAnalysis?" + queriesParams)
      .then((res) => {
        console.log(res);
        setTwitterStatistics(res.data.data);
      })
      .catch(() => {
        setErrorValidation({
          ...errorValidation,
          twitterLinkInput: "Look like your link is invalid, please try again!",
        });
      });
  };

  const handleSyncDataTwitterPost = () => {
    setLoadingSyncData(true);
    handleGetTwitterAnalysis(twitterStatistics.tweetUrl).finally(() =>
      setLoadingSyncData(false)
    );
  };

  return (
    <MainLayout>
      <div
        className="w-full h-[100vh] md:h-[80vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('/videos/home-bg-2.gif')" }}
      >
        <div className="h-full w-full absolute z-10 bg-black bg-opacity-60 flex flex-wrap justify-center py-[10vh] text-white">
          <div className="text-center">
            <h1 className="py-4 text-[50px] font-bold">
              Analyze your <span className="text-primary">Twitter</span> post
              for better interaction
            </h1>
            <TwitterLinkInput
              value={twitterLinkInput}
              onChange={(e) => setTwitterLinkInput(e.target.value)}
              onSubmit={handleTwitterLinkInputSubmit}
              errorValidation={errorValidation}
            />
            <div className="relative py-[100px]">
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
                    dy="40"
                    textLength="646"
                    textRendering={"geometricPrecision"}
                  >
                    <textPath xlinkHref="#textcircle_top">
                      Get The Result For Free
                    </textPath>
                  </text>
                </svg>
              </div>
              <button
                className="absolute-center hover:opacity-80"
                onClick={handleTwitterLinkInputSubmit}
              >
                <div className="showreels-div">
                  <img
                    className={`absolute rounded-full ${
                      loadingGetResult
                        ? "animate-[spin_1s_ease-in-out_infinite]"
                        : ""
                    }`}
                    alt="twitter"
                    src="/images/twitter.jpg"
                  ></img>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {twitterStatistics.tweetUrl && (
        <div className="p-5 bg-gray-200">
          <div>
            SEO Analyze <i className="fa-solid fa-chevron-right mx-2"></i>
            Twitter Post Analyze{" "}
            <i className="fa-solid fa-chevron-right mx-2"></i>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={twitterStatistics.tweetUrl}
              className="text-primary underline"
            >
              {twitterStatistics.tweetUrl}
            </a>
            <h2 className="text-[2rem] font-medium py-2">
              Analyze result from your{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={twitterStatistics.tweetUrl}
                className="text-primary underline"
              >
                Twitter Post
              </a>
            </h2>
            <div className="bg-white py-4 px-10 leading-[3rem]">
              <h3 className="text-[1.2rem] font-semibold">
                <div className="leading-[1.5rem]">
                  Post Detail
                  <br />
                  <span className="text-sm font-normal text-gray-500">
                    <i className="fa-regular fa-clock"></i> Get Data at :{" "}
                    {getFormattedDatetimeString(twitterStatistics.fetchTime)}
                  </span>
                  <button
                    className={`ml-2 fa-solid fa-rotate ${
                      loadingSyncData
                        ? "animate-[spin_1s_ease-in-out_infinite]"
                        : ""
                    }`}
                    onClick={handleSyncDataTwitterPost}
                    title="sync data"
                  ></button>
                </div>
              </h3>

              <AnalyzeDataKVBox name={"Tweet ID"}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={twitterStatistics.tweetUrl}
                >
                  {twitterStatistics.tweetID}
                </a>
              </AnalyzeDataKVBox>
              <AnalyzeDataKVBox name={"Auther Name"}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={twitterStatistics.tweetDetails.autherProfileUrl}
                >
                  {twitterStatistics.tweetDetails.autherProfileUrl}
                </a>
              </AnalyzeDataKVBox>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
