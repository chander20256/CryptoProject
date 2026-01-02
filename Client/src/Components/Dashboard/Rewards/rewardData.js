export const treeData = {
  id: 'root',
  title: 'Start Your Journey',
  reward: '₹500',
  level: 0,
  completed: false,
  children: [
    {
      id: 'l1-tech',
      title: 'Tech Path',
      reward: '₹300',
      level: 1,
      completed: false,
      children: [
        {
          id: 'l2-web',
          title: 'Web Development',
          reward: '₹150',
          level: 2,
          completed: false,
          children: [
            { id: 'l3-react', title: 'React Mastery', reward: '₹75', level: 3, completed: false },
            { id: 'l3-node', title: 'Node.js Expert', reward: '₹75', level: 3, completed: false }
          ]
        },
        {
          id: 'l2-mobile',
          title: 'Mobile Development',
          reward: '₹150',
          level: 2,
          completed: false,
          children: [
            { id: 'l3-ios', title: 'iOS Developer', reward: '₹75', level: 3, completed: false },
            { id: 'l3-android', title: 'Android Developer', reward: '₹75', level: 3, completed: false }
          ]
        }
      ]
    },
    {
      id: 'l1-business',
      title: 'Business Path',
      reward: '₹300',
      level: 1,
      completed: false,
      children: [
        {
          id: 'l2-marketing',
          title: 'Marketing Strategy',
          reward: '₹150',
          level: 2,
          completed: false,
          children: [
            { id: 'l3-digital', title: 'Digital Marketing', reward: '₹75', level: 3, completed: false },
            { id: 'l3-content', title: 'Content Strategy', reward: '₹75', level: 3, completed: false }
          ]
        },
        {
          id: 'l2-finance',
          title: 'Finance & Growth',
          reward: '₹150',
          level: 2,
          completed: false,
          children: [
            { id: 'l3-invest', title: 'Investment Planning', reward: '₹75', level: 3, completed: false },
            { id: 'l3-analysis', title: 'Financial Analysis', reward: '₹75', level: 3, completed: false }
          ]
        }
      ]
    }
  ]
};