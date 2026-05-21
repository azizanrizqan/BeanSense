import { useState } from "react"
import axios from "axios"

function App() {

  // =========================
  // STATE
  // =========================

  const [image, setImage] = useState(null)

  const [preview, setPreview] = useState(null)

  const [prediction, setPrediction] = useState("")

  const [confidence, setConfidence] = useState("")

  const [loading, setLoading] = useState(false)

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImage = (e) => {

    const file = e.target.files[0]

    setImage(file)

    setPreview(
      URL.createObjectURL(file)
    )

  }

  // =========================
  // HANDLE UPLOAD
  // =========================

  const handleUpload = async () => {

    if (!image) {

      alert("Upload gambar dulu!")

      return

    }

    const formData = new FormData()

    formData.append(
      "image",
      image
    )

    try {

      setLoading(true)

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      )

      setPrediction(
        response.data.prediction
      )

      setConfidence(
        response.data.confidence
      )

      setLoading(false)

    } catch (error) {

      console.log(error)

      setLoading(false)

      alert("Error predict!")

    }

  }

  // =========================
  // UI
  // =========================

  return (

    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#f5f5f5",
        fontFamily:"Arial"
      }}
    >

      <div
        style={{
          width:"400px",
          background:"white",
          padding:"30px",
          borderRadius:"20px",
          boxShadow:"0px 0px 15px rgba(0,0,0,0.2)",
          textAlign:"center"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            color:"brown"
          }}
        >
          ☕ BeanSense AI
        </h1>

        <p>
          Coffee Bean Classification
        </p>

        {/* INPUT */}

        <input
          type="file"
          onChange={handleImage}
        />

        <br />
        <br />

        {/* PREVIEW */}

        {
          preview && (

            <img
              src={preview}
              alt="preview"
              style={{
                width:"250px",
                borderRadius:"10px"
              }}
            />

          )
        }

        <br />
        <br />

        {/* BUTTON */}

        <button
          onClick={handleUpload}
          style={{
            padding:"10px 20px",
            border:"none",
            borderRadius:"10px",
            background:"brown",
            color:"white",
            cursor:"pointer"
          }}
        >
          Predict Coffee
        </button>

        {/* LOADING */}

        {
          loading && (

            <h3>
              Loading...
            </h3>

          )
        }

        {/* RESULT */}

        {
          prediction && (

            <div
              style={{
                marginTop:"20px",
                background:"#f3f3f3",
                padding:"15px",
                borderRadius:"15px"
              }}
            >

              <h2>
                Hasil Prediksi
              </h2>

              <h1
                style={{
                  color:"brown"
                }}
              >
                {prediction}
              </h1>

              <h3>
                Confidence:
                {confidence}%
              </h3>

            </div>

          )
        }

      </div>

    </div>

  )

}

export default App