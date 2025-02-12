// cv.ts

import profileData from '../public/content/profileData.json';

// Xác định các section có thể có trong CV (có thể mở rộng / thay đổi tuỳ data thật)
const Tabs: string[] = ['Projects', 'Side Projects', 'Exhibitions', 'Speaking', 'Writing', 'Awards', 'Features', 'Work Experience', 'Volunteering', 'Education', 'Certifications', 'Contact'];

// Interface cho dữ liệu từ profileData.json (bạn có thể chi tiết hoá hoặc bổ sung tuỳ ý)
interface ProfileData {
  general: {
    sectionOrder?: string[];
    [key: string]: any;
  };
  // Mỗi trường dưới đây là 1 mảng (vd: project, writing, contact, ...)
  // Tuỳ cấu trúc JSON thật mà bạn điều chỉnh type nhé
  projects?: any[];
  sideProjects?: any[];
  exhibitions?: any[];
  talks?: any[];
  writing?: any[];
  awards?: any[];
  features?: any[];
  workExperience?: any[];
  volunteering?: any[];
  education?: any[];
  certifications?: any[];
  contact?: any[];
  [key: string]: any;
}

// Giả lập type cho phần Media
interface MediaProps {
  url: string;
  width?: number;
  height?: number;
}

// Tạo class quản lý các object media
class CVMediaObject {
  url: string;
  width?: number;
  height?: number;

  constructor(props: MediaProps) {
    this.url = props.url;
    this.width = props.width;
    this.height = props.height;
  }

  toString() {
    return this.url;
  }
}

// Xác định kiểu cho record các file media,
// key là string, value có ít nhất trường `url` và có thể kèm `width, height`.
const mediaFiles: Record<string, MediaProps> = {
  'backdrop.jpg': {
    url: '/mediaManager/backdrop.jpg',
    width: 3508,
    height: 2480,
  },
  'contact.png': {
    url: '/mediaManager/contact.png',
    width: 1024,
    height: 1024,
  },
  'document.png': {
    url: '/mediaManager/document.png',
    width: 32,
    height: 32,
  },
  'folder.png': {
    url: '/mediaManager/folder.png',
    width: 1024,
    height: 1024,
  },
  'listen.png': {
    url: '/mediaManager/listen.png',
    width: 1024,
    height: 1024,
  },
  'soundtrack-cover.jpg': {
    url: '/mediaManager/soundtrack-cover.jpg',
    width: 1200,
    height: 1200,
  },
  'soundtrack.mp3': {
    url: '/mediaManager/soundtrack.mp3',
  },
  // Thêm rỗng để tránh lỗi truy cập key không tồn tại
  '': {
    url: '',
  },
};

// Hàm chuyển tên section sang tên trường JSON
function profileSectionToJSONField(section: string): string | undefined {
  switch (section) {
    case 'Projects':
      return 'projects';
    case 'Side Projects':
      return 'sideProjects';
    case 'Exhibitions':
      return 'exhibitions';
    case 'Speaking':
      return 'talks';
    case 'Writing':
      return 'writing';
    case 'Awards':
      return 'awards';
    case 'Features':
      return 'features';
    case 'Work Experience':
      return 'workExperience';
    case 'Volunteering':
      return 'volunteering';
    case 'Education':
      return 'education';
    case 'Certifications':
      return 'certifications';
    case 'Contact':
      return 'contact';
    default:
      return undefined;
  }
}

// Kiểu của mỗi collection (chỉ là ví dụ)
interface CVCollection {
  name: string;
  items: any[]; // T tuỳ ý, do data JSON
}

// Kiểu chung cho đối tượng cv (kết hợp giữa ProfileData & bổ sung hàm/thuộc tính)
interface CV extends ProfileData {
  readonly allCollections: CVCollection[];
  media(filename: string): CVMediaObject;
}

// Ép kiểu profileData về ProfileData
const typedProfileData = profileData as ProfileData;

// Tạo object cv, kế thừa toàn bộ field từ profileData + bổ sung allCollections & media
const cv: CV = {
  ...typedProfileData,

  get allCollections() {
    const ret: CVCollection[] = [];
    // Sử dụng order nếu có, nếu không thì dùng Tabs
    const sections = typedProfileData.general.sectionOrder || Tabs;
    for (const section of sections) {
      const jsonField = profileSectionToJSONField(section);
      if (typeof jsonField === 'undefined') {
        continue;
      }
      const fieldValue = typedProfileData[jsonField];
      if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
        continue;
      }
      ret.push({
        name: section,
        items: fieldValue,
      });
    }
    return ret;
  },

  media(filename: string) {
    // Nếu filename không tồn tại thì dùng key rỗng
    const file = mediaFiles[filename] || mediaFiles[''];
    return new CVMediaObject(file);
  },
};

export default cv;
