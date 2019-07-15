class Uploader {

  constructor({file, onProgress}) {
    this.file = file;
    this.onProgress = onProgress;

<<<<<<< HEAD
    // создаём уникальный идентификатор файла
    // для большей уникальности мы также могли бы добавить идентификатор пользовательской сессии (если она есть)
=======
    // create fileId that uniquely identifies the file
    // we could also add user session identifier (if had one), to make it even more unique
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
    this.fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
  }

  async getUploadedBytes() {
    let response = await fetch('status', {
      headers: {
        'X-File-Id': this.fileId
      }
    });

    if (response.status != 200) {
      throw new Error("Can't get uploaded bytes: " + response.statusText);
    }

    let text = await response.text();

    return +text;
  }

  async upload() {
    this.startByte = await this.getUploadedBytes();

    let xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", "upload", true);

    // отправляем индентификатор файла, так что сервер будет знать, какая из загрузок возобновляется
    xhr.setRequestHeader('X-File-Id', this.fileId);
    // отправляем номер байта, с которого следует возобновить загрузку, то есть сервер поймёт, что это не новая загрузка
    xhr.setRequestHeader('X-Start-Byte', this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("send the file, starting from", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // возвращаем
    //   true, если загрузка успешно завершилась
    //   false, если она отменена
    // выбрасываем исключение в случае ошибки
    return await new Promise((resolve, reject) => {

      xhr.onload = xhr.onerror = () => {
        console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Upload failed: " + xhr.statusText));
        }
      };

      // этот обработчик срабатывает, только когда вызывается xhr.abort()
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
