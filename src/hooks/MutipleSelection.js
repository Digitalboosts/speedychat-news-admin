
import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";



const MutipleSelection = ({language ,setSelectedUrls ,id , selectedUrls }) => {
   const [state, setState] = useState([]);

   const handleMultiple = (e) => {
      console.log("before:", state);
      const {
         target: { value },
      } = e;

      const selectedUrls = typeof value === "string" ? value.split(",") : value;

      setSelectedUrls((prevState) => {
         // Check if there's already an entry for the current id
         const existingEntryIndex = prevState.findIndex((entry) => Object.keys(entry)[0] === id);
         console.log("existingEntryIndex:", existingEntryIndex);
         // Create a new entry object

         if (existingEntryIndex > -1) {
      
            const updatedState = [...prevState];
            const existingUrls = updatedState[existingEntryIndex][id];

            // Determine which URLs to add and which to remove
            const newUrls = [...new Set([...existingUrls, ...selectedUrls])];
            const updatedUrls = newUrls.filter(url => selectedUrls.includes(url));

            updatedState[existingEntryIndex] = {
                [id]: updatedUrls,
            };
            return updatedState;
         } else {
            // If no entry exists, add new entry
            return [...prevState, { [id]: selectedUrls }];
         }
      });
   };

   const handleChipClick = (url) => {
      window.open(url, "_blank"); // Opens the URL in a new tab
   };

   return (
      <div>
         <Box>
            <FormControl
               variant="standard"
               size="large"
               sx={{ m: 1, maxWidth: 400 , minWidth: 200}}
               >
               <InputLabel id="select" label="Lang">
                  Select Refrence Urls
               </InputLabel>
               <Select
                  multiple
                  value={selectedUrls.find((entry) => Object.keys(entry)[0] === id)?.[id] || []}
                  onChange={handleMultiple}
                  renderValue={(selLang) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selLang.map((value) => (
                           <Chip key={value} color="info" 
                           label={new URL(value).hostname}
                           sx={{ backgroundColor: '#42ccb3', color: 'white' }}  
                           onClick={() => handleChipClick(value)}
                           />
                        ))}
                     </Box>
                  )}
                  >
                  {language.map((lang) => (
                     <MenuItem key={lang} value={lang}>
                      {new URL(lang).hostname} 
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>
      </div>
   );
};
export default MutipleSelection;