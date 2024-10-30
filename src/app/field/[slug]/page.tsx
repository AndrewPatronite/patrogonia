import FieldClient from './FieldClient';
import {
  CaveName,
  ContinentName,
  TownName,
} from '../../../environment/maps/types';
import values from 'lodash/values';

export const generateStaticParams = () =>
  values(ContinentName)
    .map((continentName) => `${continentName}`)
    .concat(values(CaveName))
    .concat(values(TownName))
    .map((mapName) => mapName.replaceAll(' ', '_').toLowerCase())
    .map((slug) => ({
      slug,
    }));

const Page = () => <FieldClient />;

export default Page;
