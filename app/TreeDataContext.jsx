// // TreeDataContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const TreeDataContext = createContext();

// // Create a provider component
// export const TreeDataProvider = ({ children }) => {
//   const [treeData, setTreeData] = useState({
//     treeId: '',
//     height: '',
//     numBranches: 0,
//     branchDiameters: []
//   });

//   const updateTreeData = (newData) => {
//     setTreeData(prevData => ({
//       ...prevData,
//       ...newData
//     }));
//   };

//   const resetTreeData = () => {
//     setTreeData({
//       treeId: '',
//       height: '',
//       numBranches: 0,
//       branchDiameters: []
//     });
//   };

//   return (
//     <TreeDataContext.Provider value={{ treeData, updateTreeData, resetTreeData }}>
//       {children}
//     </TreeDataContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useTreeData = () => {
//   const context = useContext(TreeDataContext);
//   if (context === undefined) {
//     throw new Error('useTreeData must be used within a TreeDataProvider');
//   }
//   return context;
// };

// TreeDataContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context with default value
const TreeDataContext = createContext({
  treeData: {
    treeId: '',
    height: '',
    numBranches: 0,
    branchDiameters: []
  },
  updateTreeData: () => {},
  resetTreeData: () => {}
});

// Provider component
export const TreeDataProvider = ({ children }) => {
  const [treeData, setTreeData] = useState({
    treeId: '',
    height: '',
    numBranches: 0,
    branchDiameters: []
  });

  const updateTreeData = (newData) => {
    setTreeData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const resetTreeData = () => {
    setTreeData({
      treeId: '',
      height: '',
      numBranches: 0,
      branchDiameters: []
    });
  };

  return (
    <TreeDataContext.Provider value={{ treeData, updateTreeData, resetTreeData }}>
      {children}
    </TreeDataContext.Provider>
  );
};

// Custom hook
export const useTreeData = () => {
  return useContext(TreeDataContext);
};