import { Button, Loader } from "@/components/index";
import {
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
} from "face-api.js";
import { useEffect, useRef, useState } from "react";
import styles from "./faceRecognition2.module.scss";
import { storage } from "@/utils/firebase/config";
import {
  getBlob,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
} from "firebase/storage";
import Image from "next/image";

const VALID_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const FaceRecognition2 = () => {
  const [dataSetImages, setDataImages] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderMsg, setLoaderMsg] = useState("");
  const [queryImage, setQueryImage] = useState<string | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | "">("");

  const queryCanvasElement = useRef(null);
  const queryImageElement = useRef(null);
  const refImgElements = useRef<(HTMLImageElement | null)[]>([]);

  const addImageRef = (index: number, imageRef: HTMLImageElement | null) => {
    refImgElements.current[index] = imageRef;
  };

  const setImagesForRecognition = (event: any) => {
    const filesArr = Array.from(event.target.files || []);
    if (filesArr.length > 20) {
      setRecognitionError("Maximum 20 images are allowed");
      return;
    }
    if (filesArr) {
      const images = [];
      refImgElements.current = [];
      setRecognitionError("");
      for (let i = 0; i < filesArr.length; i++) {
        const image = event.target.files[i];
        if (VALID_IMAGE_FORMATS.includes(image.type)) {
          images.push({
            name: image.name,
            src: URL.createObjectURL(image),
          });
        }
      }
      // console.log(filesArr);
      // console.log(images);
      setDataImages(images);
    }
  };

  const handleQueryImage = (event: any) => {
    if (event?.target?.files && event?.target?.files[0]) {
      setRecognitionError("");
      const image = event.target.files[0];
      setQueryImage(URL.createObjectURL(image));
      if (queryCanvasElement.current) {
        const canvasEle = queryCanvasElement.current as HTMLCanvasElement;
        const ctx = canvasEle.getContext("2d");
        ctx?.reset();
        // ctx?.drawImage(image, 0, 0, 500, 500);
      }
    }
  };

  const setImagesForRecognitionFirebase = async (event: any) => {
    setIsLoading(true);
    setLoaderMsg("Loading gambar dari firebase...");
    const storageRef = ref(storage, "images/students");
    const result = await listAll(storageRef);
    // console.log(result);

    // CARA SETTING BLOB NYA LUAR BIASA SULIT dari firebase ngatur cors
    const blobs = await Promise.all(
      result.items.map(async (item) => {
        const metadata = await getMetadata(item);
        const blob = await getBlob(item);
        return {
          name: item.name,
          src: URL.createObjectURL(blob),
          type: metadata.contentType,
        };
      })
    );

    const filteredBlobs = blobs.filter(
      (blob) => blob.type && VALID_IMAGE_FORMATS.includes(blob.type)
    );
    // console.log(filteredBlobs);
    setDataImages(filteredBlobs);
    setIsLoading(false);
    setLoaderMsg("");
  };

  const loadModels = async () => {
    setLoaderMsg("Please wait while SSD Mobile net model is loading...");
    await loadSsdMobilenetv1Model("/models");
    setLoaderMsg("Please wait while face landmark model is loading...");
    await loadFaceLandmarkModel("/models");
    setLoaderMsg("Please wait while FaceRecognition model is loading...");
    await loadFaceRecognitionModel("/models");
    setIsLoading(false);
    setLoaderMsg("");
  };
  //   console.log(isLoading);

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <>
      <Loader loading={isLoading} text={loaderMsg} />
      <div className={`container ${styles.container}`}>
        <div className={`${styles.imageSection} ${styles.multiImageSection}`}>
          <div className={styles.twoSectionPreview}>
            <div className={styles.dataSetSection}>
              <h4>Create a data set for recognition</h4>
              <div>
                {dataSetImages?.map((image, index) => {
                  return (
                    <div className={styles.imageArea} key={`data-set-${index}`}>
                      <Image
                        ref={(imageRef) => addImageRef(index, imageRef)}
                        src={image.src}
                        alt={image.name}
                        width={100}
                        height={100}
                      />
                      <span>{image.name}</span>
                    </div>
                  );
                })}
              </div>
              <label htmlFor="multiFileSelect" className={styles.fileUpload}>
                <span>
                  <i className="bi bi-upload"></i>
                </span>
                Upload image data set for face recognition
              </label>
              <input
                id="multiFileSelect"
                type="file"
                onChange={setImagesForRecognition}
                multiple
                accept="image/jpeg, image/png, image/webp"
                hidden
              />
            </div>

            {/* AMBIL GAMBAR DARI FIREBASE (COBA) */}
            <label htmlFor="multiFileSelect" className={styles.fileUpload}>
              <span>
                <i className="bi bi-upload"></i>
              </span>
              Ambil Foto dari Firebase
            </label>
            <button onClick={setImagesForRecognitionFirebase}>
              Ambil Foto dari Firebase
            </button>
          </div>
          <div className={styles.queryImageSection}>
            <h4>Query Image</h4>
            <div>
              {queryImage && (
                <>
                  <Image
                    ref={queryImageElement}
                    src={queryImage}
                    alt="Image to be recognized for face, Face Recognition"
                    width={500}
                    height={500}
                  />
                  <canvas
                    ref={queryCanvasElement}
                    className={styles.canvas}
                    width={500}
                    height={500}
                  />
                </>
              )}
            </div>
            <label htmlFor="queryImage" className={styles.fileUpload}>
              <span>
                <i className="bi bi-upload"></i>
              </span>
              Upload query image for face recognition
            </label>
            <input
              id="queryImage"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleQueryImage}
              hidden
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {/* <Button variant="primary" onClick={() => loadRecognizedFaces()}>
              Recognize Face
            </Button> */}
        </div>
        {/* {recognitionError && (
            <div className="alert alert-danger" role="alert">
              {recognitionError}
            </div>
          )} */}
      </div>
    </>
  );
};

export default FaceRecognition2;
