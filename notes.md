# notes / thoughts

## 1. Current issues:

- updates. When one cell references another, it currently doesn't care if the original updates (i.e. if one cell contains =A1 and A1 then changes, this cell still displays the old value). Key feature, needs fixing.

- infinite loops. Currently there are no restrictions or catches on who can reference who, meaning we can have two cells reference each other and no one will care. They don't break, but they aren't accurate either. Really their display vals should error instead.

- accessibility. I put this on hold to complete the functionality, but this page structure isn't great. Onclicks to access forms (currently unlabeled forms) is fine visually (due to prev experience with spreadsheets tbh), but not structurally. Adding things like the ability to tab between cells to navigate, adding a static input in the header (etc etc), would help some, but this is a whole different accessibility game that I could invest a whole day (if not more) into researching how to make this better.

- data is temporary. Much smaller issue (can get localStorage involved), but was more annoying as it will be so much quicker to fix haha. Treating this as low priority though.

## 1. Next up - re-rendering on updated values

Currently the display values do not re-evaluate when the cells they reference update. The other big issue of infinite referencing between cells plays into my thinking around this too. Even though they can be treated as separate steps, I'd rather fix both in one.

Some thoughts on ways we could fix this:

### 1. just loop it

- We can loop over the whole list of cells anytime the user updates one to check if something changes, and we can keep looping until no more changes happen to our display values
- No big whoop to catch infinite referencing this way if we only update cells' display vals whose child references are complete. If there is an invalid tree no more changes will happen once there are no more updating child references, and therefore the loop will stop (and we can add some error msgs instead)
- Obviously not the greatest in terms of computations, but all who have a valid reference tree will be updated eventually, so fine for now 

### 2. keep track of who references who

- This could be as simple as an array of who each cell references in their dataObj, and a loop through on a user update to see if there are any updates needed to other cells. This loop is less to code, but catching an infinite referencing problem would become complex
- If we keep track of who references each cell however, it enables us to create our own update stack/tree of who specifically needs updating. We can either store it separate to the data we already have for clarity's sake, or keep it within our dataObjs that we already use depending on the complexity
- Leaning into this then makes catching referencing loops easier as we can see the full path of children any cell might have, though requires more coding and helper functions generally. It's more dev intensive but better in the long run

### So what am I going to do?

For me number two is my go to. I likely would have done number one if I thought I could fit it in to this challenge time-wise, but as I will no longer be working to time with this one, having trees of references will be a lot more efficient than loop after loop and better for DOM updates too.

Though to be honest there's lot of little tweaks (like saving our data) that I might do first cause they've annoyed me throughout this as they're easily solvable, but got put on the back burner as they weren't the goals that were set.

## Last steps

Steps 6 and 7 seem less intensive than the above to be honest as they're more similar to code already added.

6. _Add support for some basic functions. For example if you enter "=sum(A1:A10)" into A11, then it
should calculate the sum of all cells in the range and display the result in A11. Updating any value in
the range would recalculate A11._

The update part would be handled by the above section, so likely no worries with the update so long as we keep track of which cells are doing this reference (like we will with the current code). The new syntax would need to be recognised by helper functions similar to `isValidFormula` which currently exists in utils, and also make a decision on whether `=sum(a1:b2)` would be invalid or include the full square (i.e. a1,a2,b1,b2). This means once recognised we will need to work with x and y neighbours and create some helpers to return the range of values between two given cells. Not too complex, but more so than our existing formulas.

7. _Add support for formatting, for example bold, italics and underline_

This is all css styling, so we just need to keep track of which cell is currently active (already easily accessed, or we could set that on click), have some boolean flags in the cell dataObjs to keep track, and line these up with some buttons or toggles in the header. On button click we can set the flag in the data and add/remove classes that will have the appropriate styling. Tbh this sounds fun and I might've done this earlier if I wasn't brain-grappling with the earlier stuff.


## Notes for me for later

- localstorage
  - onload check if data stored or save flag exists in storage
    - else modal to ask if save to browser and set flag
  - if asked don't ask again but make a lil toggle in header
  - or v1, just save anyway
- create reference map for simple updating (& loop catching)
  - keeping a ref of the cells you reference, but also those who access you for back & forward traversal
  - in data objs? or in separate map
- redirect doesn't correct user input just forgive it, need general update and re-eval in general
- bold / italics are css changes
  - simple classes need to be added
    - itallic => font-style: italic
    - bold => font-weight: bold;
  - active cell class list toggle (onfocusout might be too much)
- err msg in dataObj for unique messages
- pretty pretty
  - buttons / header
  - colors on errs?
- once ref map exists can also add highlights for cells like sheets does
