import './Sidemenu.css'

const SideMenu = ({ clearChat, currentModel, setCurrentModel, models, setTemperature, temperature }) => 
<aside className="sidemenu max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
      <div className="side-menu-button" onClick={clearChat}>
        Clear Chat
      </div>
      <div className="models">
      <label className="side-label">Model</label>
        <select 
          // active if model is select is currentModel
          value={currentModel}
          className="select-models"
          onChange={(e)=>{
          setCurrentModel(e.target.value)
        }}>
          {models && models.length ? models.map((model, index) => (
            <option 
              key={model.id} 
              value={model.id}>{model.id}</option>
          )) :  <option 
                  key={"text-davinci-003"} 
                  value={"text-davinci-003"}>{"text-davinci-003"}</option>}
        </select>
        
        <Button 
          text="Smart - Davinci" 
          onClick={()=>setCurrentModel("text-davinci-003")} />
           <Button 
          text="Code - Crushman" 
          onClick={()=>setCurrentModel("code-cushman-001")} />
        <span className="info">
          The model parameter controls the engine used to generate the response. Davinci produces best results.
         </span>
        <label className="side-label" >Temperature</label>
        <input 
          className="select-models" 
          type="number" 
          onChange={(e)=> setTemperature(e.target.value)}
          min="0" 
          max="1" 
          step="0.1"
          value={temperature}
         />
         <Button 
          text="0 - Logical" 
          onClick={()=>setTemperature(0)} />
         <Button 
          text="0.5 - Balanced" 
          onClick={()=>setTemperature(0.5)} />
         <Button 
          text="1 - Creative" 
          onClick={()=>setTemperature(1)} />
         <span className="info">
          The temperature parameter controls the randomness of the model. 0 is the most logical, 1 is the most creative.
         </span>
      </div>
    </aside>

const Button = ({ onClick, text }) =>
  <div 
    className="button-picker" 
    onClick={onClick}>
    {text}
  </div>

export default SideMenu