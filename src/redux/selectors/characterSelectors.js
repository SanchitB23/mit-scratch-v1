import {createSelector} from "reselect";

const getCharacter = (state) => state.character.characters
const getCharacters = (state) => state.character
const getActiveCharacter = (state) => state.character.active
const x = (character) => character
export const getCharactersSelector = createSelector(getCharacter, x);
export const getCharacterSelector = createSelector(getCharacters, x);
export const getActiveCharacterSelector = createSelector(getActiveCharacter, x);
