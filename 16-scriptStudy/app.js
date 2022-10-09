const path = require('path');
const os = require('os');
const fs = require('fs');
/*
1. 사용자가 원하는 폴더의 이름을 받아온다.
2. 그 폴더안에 video, captured, duplicated 폴더를 만든다.
3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234를 (IMG_E1234)를 돌면서 분류한다.
  
<요구 사항 분석>
- viedeo 폴더 내부에는 .mp4, .mov 확장자를 가진 것들을
- captured 폴더 내부에는 .png, .aae 확장자를 가진 것들을
- duplicated 폴더 내부에는 수정파일의 원본이 들어가있게
    
    (ex IMG_0710.jpg 파일을 수정하면 수정후 파일이 IMG_E0710.jpg로 수정된 파일이 생기는데
    
    그 원본파일을 duplicated에 옮기고 싶다는말)


1. 노드 명령에서 인자를 넘기고 싶을때는
process.argv 를 이용하면 된다.
터미널에 nodemon app.js test 를 실행시키면
[
  '/usr/local/bin/node', //실행되고 있는 노드의 경로
  '/Users/leegunhee/Desktop/RealNodeStudy/16-scriptStudy/app.js', //노드 application의 경로
  'test' //터미널 명렁어 실행시 인자 출력
]
위의 정보가 출력된다.
*/

const folder = process.argv[2];

const workingDir = path.join(
  os.homedir(),
  'Desktop',
  'RealNodeStudy',
  '16-scriptStudy',
  folder
);

//폴더의 존재 유무 체크
if (!folder || !fs.existsSync(workingDir)) {
  console.error('Please enter folder name in Pictures');
}

const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

//헤당 경로에 폴더가 존재하지 않을때만 폴더만들기!
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

//폴더 안에있는 파일들을 다 돌면서 생성한 폴더에 분류해보자!
fs.promises
  .readdir(workingDir)
  .then(data => processFiles(data))
  .catch(error => console.log(error));

function processFiles(files) {
  files.forEach(file => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
    return false;
  }

  const edited = `IMG_E${file.split('_')[1]}`;
  const found = files.find(f => f.includes(edited));
  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${targetDir}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);

  fs.promises.rename(oldPath, newPath);
}

console.log(workingDir);
