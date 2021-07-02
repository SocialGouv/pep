import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  STORAGE_KEY_IS_FIRST_LAUNCH,
  STORAGE_KEY_SYMPTOMS,
  STORAGE_KEY_SUPPORTED,
  STORAGE_KEY_CUSTOM_SYMPTOMS,
  STORAGE_KEY_MEDICAL_TREATMENT,
  STORAGE_KEY_NOTES_VERSION,
  STORAGE_KEY_VISIT_PRO_NPS,
  STORAGE_KEY_CUSTOM_DRUGS,
} from '../utils/constants';

const getSymptoms = async () => {
  const symptoms = await AsyncStorage.getItem(STORAGE_KEY_SYMPTOMS);
  if (symptoms) {
    return JSON.parse(symptoms);
  }
};

const setSymptoms = async (symp) => {
  await AsyncStorage.setItem(STORAGE_KEY_SYMPTOMS, JSON.stringify(symp));
};

const getIsFirstAppLaunch = async () =>
  await AsyncStorage.getItem(STORAGE_KEY_IS_FIRST_LAUNCH);

const setIsFirstAppLaunch = async (isAppFirstLaunch) => {
  await AsyncStorage.setItem(
    STORAGE_KEY_IS_FIRST_LAUNCH,
    JSON.stringify(isAppFirstLaunch),
  );
};

const getSupported = async () => {
  const supported = await AsyncStorage.getItem(STORAGE_KEY_SUPPORTED);
  if (supported) {
    return JSON.parse(supported);
  }
};

const setSupported = async (supported) =>
  await AsyncStorage.setItem(STORAGE_KEY_SUPPORTED, JSON.stringify(supported));

const getCustomSymptoms = async () => {
  const customSymptoms = await AsyncStorage.getItem(
    STORAGE_KEY_CUSTOM_SYMPTOMS,
  );
  return JSON.parse(customSymptoms) || [];
};

const addCustomSymptoms = async (sym) => {
  const customSymptoms = await getCustomSymptoms();
  customSymptoms.push(sym);
  await AsyncStorage.setItem(
    STORAGE_KEY_CUSTOM_SYMPTOMS,
    JSON.stringify(customSymptoms),
  );
};

const getMedicalTreatment = async () => {
  const a = await AsyncStorage.getItem(STORAGE_KEY_MEDICAL_TREATMENT);
  return JSON.parse(a);
};

const setMedicalTreatment = async (v) => {
  await AsyncStorage.setItem(STORAGE_KEY_MEDICAL_TREATMENT, JSON.stringify(v));
};

const getNotesVersion = async () => {
  const a = await AsyncStorage.getItem(STORAGE_KEY_NOTES_VERSION);
  return JSON.parse(a);
};

const setNotesVersion = async (v) => {
  await AsyncStorage.setItem(STORAGE_KEY_NOTES_VERSION, JSON.stringify(v));
};

const getVisitProNPS = async () => {
  const a = await AsyncStorage.getItem(STORAGE_KEY_VISIT_PRO_NPS);
  return JSON.parse(a);
};

const setVisitProNPS = async (v) => {
  await AsyncStorage.setItem(STORAGE_KEY_VISIT_PRO_NPS, JSON.stringify(v));
};

const getCustomDrugs = async () => {
  const customDrugs = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_DRUGS);
  return JSON.parse(customDrugs) || [];
};

const addCustomDrug = async (drug) => {
  const customDrugs = await getCustomDrugs();
  customDrugs.push(drug);
  await AsyncStorage.setItem(
    STORAGE_KEY_CUSTOM_DRUGS,
    JSON.stringify(customDrugs),
  );
};

export default {
  getSymptoms,
  setSymptoms,
  getIsFirstAppLaunch,
  setIsFirstAppLaunch,
  getSupported,
  setSupported,
  getCustomSymptoms,
  addCustomSymptoms,
  getMedicalTreatment,
  setMedicalTreatment,
  getNotesVersion,
  setNotesVersion,
  getVisitProNPS,
  setVisitProNPS,
  addCustomDrug,
  getCustomDrugs,
};
