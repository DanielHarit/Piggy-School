import InstaStories from "react-insta-stories";

const mockStories = [
  {
    url: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg",
    duration: 5,
  },
  {
    url: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg",
    duration: 5,
  },
  {
    url: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg",
    duration: 5,
  },
  {
    url: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg",
    duration: 5,
  },
  {
    url: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg",
    duration: 5,
  },
];

const Stories = () => {
  return (
    <InstaStories
      stories={mockStories}
      defaultInterval={1500}
      width={432}
      height={768}
    />
  );
};
export default Stories;
