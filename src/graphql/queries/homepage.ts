
export const GET_HOMEPAGE_DATA = `
  query HomepageComplete {
    homepageCollection(limit: 1) {
      items {
        sys {
          id
        }
        content {
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                __typename
                ... on BlockImageOrVideo {
                  videoUrl
                  title
                  blockWidth
                  showCaption
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
                contentType
              }
            }
          }
        }
        animatedSlidesCollection {
          items {
            sys {
              id
            }
            image {
              url
              width
              height
              description
              title
            }
            cropCoordinatesX
            cropCoordinatesY
            backgroundColor
            text
            cta {
              text
              link
              opensNewTab
            }
          }
        }
        resourcesSectionTitle
        resourcesSectionDescription
        resourcesLinksCollection {
          items {
            sys {
              id
            }
            text
            link
            opensNewTab
            caption
          }
        }
        journalSectionTitle
        journalSectionDescription
        journalSectionAmount
        volunteerSectionTitle
        caseStudySectionTitle
        caseStudyLinksCollection {
          items {
            sys {
              id
            }
            title
            slug
            projectIcon {
              url
              width
              height
            }
            thumbnailImage {
              url
              width
              height
            }
            headerImage {
              url
              width
              height
            }
          }
        }
        linksSection {
          json
        }
        linksSectionLinksCollection {
          items {
            sys {
              id
            }
            text
            link
            description
            opensNewTab
            backgroundImage {
              url
              width
              height
            }
          }
        }
      }
    }

    blockImageOrVideoCollection(limit: 1, where: { videoUrl_exists: true }) {
      items {
        sys {
          id
        }
        videoUrl
        title
        blockWidth
        showCaption
      }
    }

    volunteerOpportunityCollection(
      where: { sys: { id_not: "2vhfaCxKsV1ZhmYPuXCnUX" } }
      limit: 2
    ) {
      items {
        sys {
          id
        }
        title
        location
        description {
          json
        }
      }
    }

    journalPostCollection(
      where: { published: true, date_not: null }
      order: [date_DESC]
      limit: 6
    ) {
      items {
        sys {
          id
        }
        title
        slug
        type
        date
        thumbnailImage {
          url
          width
          height
        }
      }
    }
  }
`;
