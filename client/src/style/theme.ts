import { ThemeType } from "../redux/slice/themeSlice";

export type Theme = {
  color: {
    backgroundColor: string;
    titleColor: string;
    fontColor: string;
    borderColor: string;
    goldBoxTitleColor: string;
  }
}

const spring: Theme = {
  color: {
    backgroundColor: '#b0d099',
    titleColor: '#a9db76',
    fontColor: 'black',
    borderColor: 'white',
    goldBoxTitleColor: '#b0d099',
  }
}

const summer: Theme = {
  color: {
    backgroundColor: '#293e68',
    titleColor: '#7686db',
    fontColor: 'white',
    borderColor: 'white',
    goldBoxTitleColor: '#c8d2e1',
  }
};

const autumn: Theme = {
  color: {
    backgroundColor: '#dda651',
    titleColor: '#95531f',
    fontColor: 'black',
    borderColor: 'white',
    goldBoxTitleColor: '#ece7dc',
  }
}

const winter: Theme = {
  color: {
    backgroundColor: '#7cbbcc',
    titleColor: '#4fa1ca',
    fontColor: 'black',
    borderColor: 'white',
    goldBoxTitleColor: '#d9ebf5',
  }
}

export const theme: {
  [key in ThemeType]: Theme;
} = {
  spring,
  summer,
  autumn,
  winter,
};
