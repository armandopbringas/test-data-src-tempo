
/**
 * Contentful Service
 * 
 * Provides methods to interact with Contentful GraphQL API
 */
import { executeQuery } from './contentfulClient';
import { GET_HOMEPAGE_DATA } from '../graphql/queries/homepage';

// Types for responses
interface Sys {
  id: string;
}

interface Asset {
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  contentType?: string;
}

interface RichText {
  json: any;
}

interface HomePage {
  sys: Sys;
  resourcesSectionTitle: string;
  journalSectionTitle: string;
  volunteerSectionTitle: string;
  caseStudySectionTitle: string;
  resourcesSectionDescription?: string;
  journalSectionDescription?: string;
  animatedSlidesCollection?: {
    items: Array<{
      sys: Sys;
      backgroundColor: string;
      text?: string;
      image?: Asset;
      cta?: {
        text: string;
        link: string;
        opensNewTab?: boolean;
      };
    }>;
  };
  resourcesLinksCollection?: {
    items: Array<{
      sys: Sys;
      text: string;
      link: string;
      opensNewTab?: boolean;
      caption?: string;
    }>;
  };
  caseStudyLinksCollection?: {
    items: Array<{
      sys: Sys;
      title: string;
      slug: string;
      projectIcon?: Asset;
      thumbnailImage?: Asset;
      headerImage?: Asset;
    }>;
  };
  linksSectionLinksCollection?: {
    items: Array<{
      sys: Sys;
      text: string;
      link: string;
      description?: string;
      opensNewTab?: boolean;
      backgroundImage?: Asset;
    }>;
  };
  content?: RichText;
  linksSection?: RichText;
}

interface JournalPost {
  sys: Sys;
  title: string;
  slug: string;
  type?: string;
  date: string;
  thumbnailImage?: Asset;
}

interface VolunteerOpportunity {
  sys: Sys;
  title: string;
  location?: string;
  description?: RichText;
}

// Response interfaces
interface HomePageResponse {
  homepageCollection: {
    items: HomePage[];
  };
  journalPostCollection?: {
    items: JournalPost[];
  };
  volunteerOpportunityCollection?: {
    items: VolunteerOpportunity[];
  };
}

/**
 * Get complete homepage data
 */
export async function getHomepage(): Promise<HomePageResponse> {
  return executeQuery<HomePageResponse>(GET_HOMEPAGE_DATA);
}

export default {
  getHomepage
};

interface BlockImageOrVideo {
  sys: Sys;
  __typename: string;
  videoUrl?: string;
  title?: string;
  blockWidth?: string;
  showCaption?: boolean;
}

interface RichTextLinks {
  entries: {
    block: Array<BlockImageOrVideo>;
  };
  assets: {
    block: Array<Asset>;
  };
}

interface RichText {
  json: any;
  links: RichTextLinks;
}

interface HomePage {
  sys: Sys;
  resourcesSectionTitle: string;
  journalSectionTitle: string;
  volunteerSectionTitle: string;
  caseStudySectionTitle: string;
  resourcesSectionDescription?: string;
  journalSectionDescription?: string;
  content?: RichText;
  animatedSlidesCollection?: {
    items: Array<{
      sys: Sys;
      backgroundColor: string;
      text?: string;
      image?: Asset;
      cta?: {
        text: string;
        link: string;
        opensNewTab?: boolean;
      };
    }>;
  };
  resourcesLinksCollection?: {
    items: Array<{
      sys: Sys;
      text: string;
      link: string;
      opensNewTab?: boolean;
      caption?: string;
    }>;
  };
  caseStudyLinksCollection?: {
    items: Array<{
      sys: Sys;
      title: string;
      slug: string;
      projectIcon?: Asset;
      thumbnailImage?: Asset;
      headerImage?: Asset;
    }>;
  };
  linksSectionLinksCollection?: {
    items: Array<{
      sys: Sys;
      text: string;
      link: string;
      description?: string;
      opensNewTab?: boolean;
      backgroundImage?: Asset;
    }>;
  };
  linksSection?: RichText;
}

interface HomePageResponse {
  homepageCollection: {
    items: HomePage[];
  };
  blockImageOrVideoCollection?: {
    items: Array<{
      sys: { id: string };
      videoUrl?: string;
      title?: string;
      blockWidth?: string;
      showCaption?: boolean;
    }>;
  };
  journalPostCollection?: {
    items: JournalPost[];
  };
  volunteerOpportunityCollection?: {
    items: VolunteerOpportunity[];
  };
}
