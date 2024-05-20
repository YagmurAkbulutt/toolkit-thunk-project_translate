import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: " Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //apiden gelen diziyi react-selectin istediği formata çevirme
  //value-label ı code-name yapma
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    //dillerin yerini değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    //storedaki veriyi state e aktar
    setText(translateState.answer);
    //statedeki veriyi storea aktar
    dispatch(setAnswer(text));
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-3xl font-semibold mb-5 mt-3 border-b">
          Translate
        </h1>

        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            onChange={(lang) => setSourceLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            className="flex-1"
          />

          <button
            onClick={handleSwap}
            className="rounded py-2 px-6 bg-blue-400 hover:bg-blue-500 text-white transition hover:ring-2"
          >
            Değiştir
          </button>

          <Select
            value={targetLang}
            onChange={(lang) => setTargetLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            className="flex-1"
          />
        </div>

        <div className="flex mt-5 gap-3 md:gap-[150px] max-md:flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[150px] max-h-[300px] p-[10px] text-[16px] rounded text-black"
          ></textarea>

          <div className="w-full relative">
            <textarea
              disabled
              value={translateState.answer}
              className="w-full min-h-[150px] max-h-[300px] p-[10px] text-[16px] rounded  text-black"
            ></textarea>
            {translateState.isLoading && (
              <div class="loader">
                <div className="square" id="sq1"></div>
                <div className="square" id="sq2"></div>
                <div className="square" id="sq3"></div>
                <div className="square" id="sq4"></div>
                <div className="square" id="sq5"></div>
                <div className="square" id="sq6"></div>
                <div className="square" id="sq7"></div>
                <div className="square" id="sq8"></div>
                <div className="square" id="sq9"></div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-blue-400 mt-3 hover:ring-2 hover:bg-blue-500 transition"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
