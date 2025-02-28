import Select from '../components/Select';
import Search from '../components/Search';
import Cities from '../components/Cities';
import Toggle from '../components/Toggle';
import { CONTINENTS, PARAM_CONTINENT, CONTINENTS_ALL, SORT_NAME, SORT_DISTANCE, PARAM_SORT, PARAM_UNITS, UNITS_F, UNITS_C } from '../common/consts';

export default function MainView() {
  return (
    <>
      <div id="header">
        <Search/>
        <Select title="Continent:" list={CONTINENTS} paramName={PARAM_CONTINENT} defaultValue={CONTINENTS_ALL} />
        <div className="toggles">
          <Toggle title="Sort by:" optionA={SORT_NAME} optionB={SORT_DISTANCE} paramName={PARAM_SORT} />
          <Toggle title="units:" optionA={UNITS_C} optionB={UNITS_F} paramName={PARAM_UNITS} />
        </div>
      </div>
      <div id="home">
        <Cities />
      </div>
    </>
  );
}
