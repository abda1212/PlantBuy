import Categories from "./components/Categories";

const App = () => {
  return (
    
<div className="w-full flex flex-wrap justify-between gap-4">
  <Categories title="Hats" imgsrc="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s'" />
  <Categories title="Sneakers" imgsrc="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s'" />
  <Categories title="Jackets" imgsrc="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s'" />
  <Categories title="Mens" isLarge imgsrc="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s'" />
  <Categories title="Womens" isLarge imgsrc="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s'" />
</div>

  );
};

export default App;
