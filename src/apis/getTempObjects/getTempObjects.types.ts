interface TempObjectData {
  color?: string;
  [key: string]: string | number | undefined;
}

interface TempObject {
  data: TempObjectData | null;
  id: string;
  name: string;
}

export type GetTempObjectsResponseType = TempObject[];
