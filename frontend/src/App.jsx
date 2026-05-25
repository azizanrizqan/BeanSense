import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  // =========================
  // STATE
  // =========================

  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }

  };

  // =========================
  // HANDLE UPLOAD
  // =========================

  const handleUpload = async () => {

    if (!image) {
      alert("Upload gambar dulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);

    } catch (error) {

      console.log(error);
      alert("Error predict!");

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // TOGGLE DARK MODE
  // =========================

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // =========================
  // RETURN JSX
  // =========================

  return (

    <div className={`
      min-h-screen
      transition-all
      duration-500
      ${darkMode
        ? "bg-[#1a1a1a] text-white"
        : "bg-[#f8f5f1] text-black"
      }
    `}>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="
        flex
        justify-between
        items-center
        px-10
        py-5
        bg-[#6f4e37]
        text-white
        shadow-lg
      ">

        <h1 className="
          text-2xl
          font-bold
        ">
          ☕ BeanSense AI
        </h1>

        <ul className="
          hidden
          md:flex
          gap-6
          font-medium
        ">

          <li className="hover:text-yellow-200 cursor-pointer">
            Home
          </li>

          <li className="hover:text-yellow-200 cursor-pointer">
            About
          </li>

          <li className="hover:text-yellow-200 cursor-pointer">
            Prediction
          </li>

        </ul>

        <button
          onClick={toggleDarkMode}
          className="
            bg-white
            text-black
            px-4
            py-2
            rounded-xl
            hover:scale-105
            transition
          "
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </nav>

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="
        px-10
        py-20
        text-center
      ">

        <h1 className="
          text-5xl
          md:text-7xl
          font-extrabold
          text-[#6f4e37]
          leading-tight
        ">

          Smart Coffee Bean
          <br />
          Classification AI

        </h1>

        <p className="
          mt-6
          text-gray-500
          text-lg
          max-w-3xl
          mx-auto
          leading-relaxed
        ">

          BeanSense menggunakan teknologi
          Computer Vision dan Machine Learning
          untuk mengklasifikasi jenis biji kopi
          berdasarkan fitur bentuk dan morfologi.

        </p>

        <button className="
          mt-10
          bg-[#6f4e37]
          hover:bg-[#5c4033]
          text-white
          px-8
          py-4
          rounded-2xl
          text-lg
          transition
          duration-300
          shadow-xl
          hover:scale-105
        ">

          Try BeanSense

        </button>

      </section>

      {/* =========================
          FEATURE SECTION
      ========================= */}

      <section className="
        px-10
        py-10
      ">

        <div className="
          grid
          md:grid-cols-3
          gap-8
        ">

          {/* CARD 1 */}

          <div className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            text-center
            hover:scale-105
            transition
            duration-300
          ">

            <div className="text-5xl">
              🖼️
            </div>

            <h1 className="
              mt-5
              text-2xl
              font-bold
              text-[#6f4e37]
            ">

              Image Processing

            </h1>

            <p className="
              mt-3
              text-gray-600
            ">

              Menggunakan OpenCV untuk
              preprocessing citra kopi seperti
              grayscale, thresholding,
              dan morphology.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            text-center
            hover:scale-105
            transition
            duration-300
          ">

            <div className="text-5xl">
              ☕
            </div>

            <h1 className="
              mt-5
              text-2xl
              font-bold
              text-[#6f4e37]
            ">

              Morphology Feature

            </h1>

            <p className="
              mt-3
              text-gray-600
            ">

              Mengekstraksi fitur bentuk
              seperti area, perimeter,
              circularity, aspect ratio,
              dan solidity.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            text-center
            hover:scale-105
            transition
            duration-300
          ">

            <div className="text-5xl">
              🤖
            </div>

            <h1 className="
              mt-5
              text-2xl
              font-bold
              text-[#6f4e37]
            ">

              KNN Classification

            </h1>

            <p className="
              mt-3
              text-gray-600
            ">

              Menggunakan algoritma
              K-Nearest Neighbor
              untuk klasifikasi
              jenis biji kopi.

            </p>

          </div>

        </div>

      </section>

      {/* =========================
          MAIN PREDICTION
      ========================= */}

      <div className="
        flex
        justify-center
        items-center
        p-5
        mt-10
        pb-20
      ">

        <div className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        ">

          {/* TITLE */}

          <h1 className="
            text-4xl
            font-bold
            text-center
            text-[#6f4e37]
            mb-2
          ">

            Coffee Bean Classification

          </h1>

          <p className="
            text-center
            text-gray-500
            mb-6
          ">

            Upload coffee bean image for prediction

          </p>

          {/* INPUT */}

          <input
            type="file"
            onChange={handleImage}
            className="
              w-full
              border
              p-3
              rounded-xl
              mb-5
              cursor-pointer
            "
          />

          {/* PREVIEW */}

          {
            preview && (

              <div className="
                flex
                justify-center
                mb-5
              ">

                <img
                  src={preview}
                  alt="preview"
                  className="
                    w-64
                    h-64
                    object-cover
                    rounded-2xl
                    shadow-lg
                  "
                />

              </div>

            )
          }

          {/* BUTTON */}

          <button
            onClick={handleUpload}
            className="
              w-full
              bg-[#6f4e37]
              hover:bg-[#5c4033]
              text-white
              py-3
              rounded-xl
              transition
              duration-300
              font-semibold
              hover:scale-105
            "
          >

            Predict Coffee

          </button>

          {/* LOADING */}

          {
            loading && (

              <div className="
                text-center
                mt-5
              ">

                <h3 className="
                  text-gray-500
                  animate-pulse
                ">

                  Loading...

                </h3>

              </div>

            )
          }

          {/* RESULT */}

          {
            prediction && (

              <div className="
                mt-6
                bg-[#f8f5f1]
                rounded-2xl
                p-5
                shadow-inner
                text-center
              ">

                <h2 className="
                  text-xl
                  font-semibold
                  text-gray-700
                ">

                  Hasil Prediksi

                </h2>

                <h1 className="
                  text-4xl
                  font-bold
                  text-[#6f4e37]
                  mt-2
                ">

                  {prediction}

                </h1>

                <h3 className="
                  mt-3
                  text-gray-600
                ">

                  Confidence:

                  <span className="font-bold">
                    {" "}
                    {confidence}%
                  </span>

                </h3>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

}

export default App;