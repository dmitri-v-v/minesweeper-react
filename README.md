
# Performance Considerations:

- `placeBombs()` in addition to modifying the grid to place the bombs, returns the coordinates of the placed bombs, so that they could be put into the Board's state. This allows us to not have to check every cell in the Board when trying to reveal all the bombs after an explosion event - since all the bomb coordinates are known, we can reveal just those cells directly.

- `placeBombs()` also does the work of updating/incrementing the cell values of the cells around each new bomb, instead of after all the bombs have been placed - iterating over every cell in the grid to check how many of its neighbours are bombs. This way you only need to do `(numBombs * 8)` updates, instead of `(rows * cols * 8)` updates.

- So far I did not see a need in keeping the entire grid state in the store, as it's only the Board component that needs to know full details of it, and thus it can manage its own grid state with just a couple of callbacks from the Cells.

- For flag coordinates though, since the flags count could be affected by each Cell, and also be displayed in the HUD, *and* the Board needs to know the latest coordinates of all the flags when revealing all the bombs, it wouldn't make sense for the Cell to provide a flag toggle callback to the Board component just to have the Board have another flag counter callback to the HUD, so it was time for Redux. Cells would dispatch events to the store to update a central list of all flag coordinates, and the Board would listen to any changes in that flags list so it could update its own internal grid state accordingly.

- My planned component hierarchy looks like this:
```
<Minesweeper>
  <HUD />
  <Board>
    <Cell />...
  </Board>
</Minesweeper>
```

- The HUD would take the user input on game properties, such as rows, cols, numBombs, and game running state. It would dispatch those to the store state because the Board component needs to know their values, and the Board component is not a child of the HUD, so there wouldn't be a direct way to do this through callbacks. 

- I would have a separate reducer slice for all the game-related state.
