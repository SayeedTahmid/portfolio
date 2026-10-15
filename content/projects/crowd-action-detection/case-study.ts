import type { CaseStudy } from "../../types.ts";

/*
 * Sources for every statement below, all in
 * https://github.com/SayeedTahmid/Crowd-action-detection-VLM :
 * - preprocess.py, train.py, evaluate.py, app.py (pipeline, model, training, demo)
 * - README.md (data sources, dataset size, training log, results table)
 * - results/confusion_matrix.png (test-set predictions)
 * - data/train.csv, data/val.csv, data/test.csv (split sizes, source-video overlap,
 *   measured for this case study on 2026-10-16)
 */
export const crowdActionDetection: CaseStudy = {
  overview: [
    "A short video of a crowd goes in; one of three labels comes out: dancing, fighting or walking. The model is a small classifier trained on top of CLIP's image encoder, which stays frozen, so training took about 30 minutes on a single consumer GPU.",
  ],
  problem: [
    "Most public action-recognition data shows a few people in tidy settings. I wanted to see how far a pretrained vision-language backbone gets on dense, real crowds from Bangladesh: flash mobs at university events, packed streets in Gulistan and Sadarghat, and footage of crowd conflict.",
  ],
  contributions: [
    "Collected the footage from YouTube with yt-dlp and cut it into 6–8 second clips with ffmpeg.",
    "Wrote the preprocessing, training, evaluation and demo code.",
    "Trained and evaluated the model, and deployed the demo to Hugging Face Spaces.",
  ],
  requirements: [
    "Train on a single consumer GPU (an RTX 3060) in a reasonable time.",
    "Work from short clips rather than long recordings.",
    "Offer a demo that anyone can use without installing anything.",
  ],
  architecture: {
    components: [
      {
        name: "Frame extraction",
        description:
          "OpenCV samples each clip at 2 frames per second and saves the frames at 224 × 224 pixels. Clips under 50 KB are skipped as corrupt.",
      },
      {
        name: "Frozen CLIP ViT-B/32 image encoder",
        description:
          "Turns a frame into a 512-dimensional embedding. Its weights never change, so no gradients flow through it.",
      },
      {
        name: "Classifier head",
        description:
          "Linear 512 → 256, ReLU, dropout 0.3, linear 256 → 3. This is the only part that is trained.",
      },
      {
        name: "Gradio demo",
        description:
          "Samples five evenly spaced frames from an uploaded video, averages the softmax probabilities, and shows all three class scores.",
      },
    ],
  },
  implementation: [
    {
      title: "Dataset and splits",
      body: [
        "837 clips in total: 298 dancing, 196 fighting and 343 walking. preprocess.py shuffles the clips with a fixed seed (42) and splits them 70 / 15 / 15 into 585 training, 126 validation and 126 test clips, written to CSV files so every run uses the same split.",
      ],
    },
    {
      title: "Training",
      body: [
        "Each clip is represented by its middle frame. The head is trained with Adam at a learning rate of 1e-4, halved every three epochs, for 10 epochs at batch size 32. The checkpoint with the best validation accuracy is kept: 98.4%, first reached at epoch 4.",
      ],
    },
    {
      title: "Evaluation",
      body: [
        "evaluate.py runs the saved checkpoint on the test split, prints scikit-learn's per-class report and draws the confusion matrix shown below.",
      ],
    },
  ],
  technologies: [
    { name: "PyTorch", purpose: "Model definition, training loop" },
    { name: "OpenAI CLIP (ViT-B/32)", purpose: "Frozen image encoder" },
    { name: "OpenCV", purpose: "Frame extraction and resizing" },
    { name: "ffmpeg, yt-dlp", purpose: "Collecting and cutting footage" },
    {
      name: "scikit-learn",
      purpose: "Classification report, confusion matrix",
    },
    { name: "Gradio, Hugging Face Spaces", purpose: "Hosted demo" },
  ],
  decisions: [
    {
      title: "Freeze the backbone, train only a small head",
      body: "With 585 training clips, fine-tuning all of CLIP would risk overfitting and need far more GPU memory. Training only the head on frozen embeddings kept training to about 30 minutes on an RTX 3060.",
    },
    {
      title: "One frame per clip for training",
      body: "Using only the middle frame keeps the pipeline simple and fast, but it means the model sees a still image, not motion. The demo partly compensates by averaging over five frames at inference time.",
    },
  ],
  results: [
    "On the 126 test clips the model is correct on 121. Every dancing and walking clip is classified correctly; of the 24 fighting clips, 4 are labeled walking and 1 dancing, which matches the visual overlap between fast-moving crowds and conflict.",
    "Read the 96% with one caveat. The clips were split at random, and the dataset comes from only 13 source videos, so every test clip comes from a video that also supplied training clips. The number measures how well the model recognizes new clips from familiar scenes, not how it would do on footage it has never seen.",
  ],
  limitations: [
    "Test clips share source videos with the training clips, so the test accuracy is likely optimistic for new footage.",
    "Only three classes: any other activity is forced into one of them.",
    "A single still frame per clip during training and evaluation, so motion is never modeled.",
    "The test classes are unbalanced: 50 dancing, 24 fighting and 52 walking clips.",
  ],
  futureWork: [
    "Split by source video, so test footage is genuinely unseen.",
    "Model several frames over time instead of one.",
    "Add classes, and detect individuals (for example with YOLOv8) so actions can be labeled per person.",
  ],
  figures: [
    {
      src: "/projects/crowd-action-detection/confusion-matrix.png",
      width: 1200,
      height: 900,
      alt: "Confusion matrix on the 126 test clips. Dancing: 50 correct. Fighting: 19 correct, 4 predicted as walking, 1 as dancing. Walking: 52 correct.",
      caption:
        "Test-set confusion matrix. All errors involve the fighting class.",
    },
    {
      src: "/projects/crowd-action-detection/gradio-demo-walking.png",
      width: 1329,
      height: 472,
      alt: "The Gradio demo with a Dhaka street clip uploaded; it predicts walking at 61%, fighting at 23% and dancing at 16%.",
      caption: "The hosted demo classifying a street scene as walking.",
    },
  ],
};
