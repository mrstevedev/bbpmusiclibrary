/**
 * This is a Node.js file that will convert .mp3 & .wav files
 * found in the downloads folder into HLS mp3u8 stream playlist files with stream chunks
 * The conversion process will put the files into /public/audio/streams.
 *
 * - Directions -
 * 1. Find an MP3 file you want to convert
 * 2. Place it in the downloads folder
 * 3. Run the command `node app.ts`
 * 4. Observe the new folder(s) in /public/audio/streams
 * 5. Observe the stream files uploaded to the S3 Bucket.
 *
 * For best practice, make ure the song names are short,
 * if its two words, separate the space with an underscore
 *
 */

const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { s3 } = require("./client/client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

/**
 * - Steps -
 * 1. Create downloads directory if it doesnt exist
 * 2. Read downloads directory and loop over the files
 * 3. Get files name of files
 * 4. Create a directory based on the file name to output to
 * 5. Create a file name and path for files to be output to
 * 6. create destination folder if it does not exist
 * 7. exec and run the ffmpeg command to create hls stream chunks.
 * 8. //!! TODO - Currently the repository nextnodehls has the updated s3 upload. Need to move it here.
 *
 */

const downloadsDir = "downloads";

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

fs.readdir(downloadsDir, (err, files) => {
  if (err) {
    console.error(err.message);

    return;
  }
  files.map(async (file) => {
    const fileName = path.join(downloadsDir, file);

    const chapterId = file.split(/.mp3|.wav/)[0];

    const dest = `public/audio/streams/${chapterId}`;

    const outputFilename = `${chapterId}.m3u8`;
    const outputPath = path.join(dest, outputFilename);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const command = `ffmpeg -i ${fileName} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputPath}`;
    exec(command, (error) => {
      if (error) {
        console.error(`ffmpeg exec error: ${error}`);
      }
    });
  });
});
