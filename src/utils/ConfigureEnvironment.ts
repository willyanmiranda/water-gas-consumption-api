import fs from 'node:fs';

import { IMAGES_FOLDER_PATH } from './paths';

export default function ConfigureEnvironment() {

  checkImagesFolder();

  function checkImagesFolder() {

    if(!fs.existsSync(IMAGES_FOLDER_PATH)) {
      fs.mkdirSync(IMAGES_FOLDER_PATH);
    }

  }

}