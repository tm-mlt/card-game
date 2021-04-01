import { TextureKeys, Textures } from "../views/Textures/index";

export class ImageLoader {
  private loader: Phaser.Loader.LoaderPlugin;
  constructor(loader: Phaser.Loader.LoaderPlugin) {
    this.loader = loader;
  }

  private _load(key: TextureKeys) {
    this.loader.image.call(this.loader, Textures[key].key, Textures[key].path);
  }
  load(keys: TextureKeys | Array<TextureKeys>) {
    if(Array.isArray(keys)) {
      keys.forEach(key => this._load(key))
      return;
    }
    const key = keys;
    this._load(key);
  }
}
export const createImageLoader = loader => key => loader.image.call(loader, Textures[key].key, Textures[key].path);
