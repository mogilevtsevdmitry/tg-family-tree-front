export enum KinshipEnum {
  YOU = 'you',
  BROTHER = 'brother',
  SISTER = 'sister',
  MOTHER = 'mother',
  FATHER = 'father',
  WIFE = 'wife',
  HUSBAND = 'husband',
  DAUGHTER = 'daughter',
  SON = 'son',
}

export interface ITreeItem {
  id: string;
  name: string;
  avatar: string;
  alive: boolean;
  birthday: Date;
  kinship: KinshipEnum;
  relations: ITreeItem[];
}
