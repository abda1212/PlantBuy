import Categories from "./components/Categories";

const App = () => {
  return (
    
    <div className='categories-container'>
   <Categories

    title={'hats'}
   />
   <Categories

title={'men'}
/>
<Categories

title={'woman'}
/>
<Categories

title={'sneakers'}
/>
<Categories

title={'hoodies'}
/>

    </div>
  );
};

export default App;
