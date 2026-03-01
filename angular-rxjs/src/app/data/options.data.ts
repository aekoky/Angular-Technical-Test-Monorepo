import { Option } from '../models/option.model';

export const MOCK_OPTIONS: Option[] = [
    // Front saltos
    { id: 'opt-f01', label: '101', value: 1.0, category: 'front' },
    { id: 'opt-f02', label: '2½', value: 1.5, category: 'front' },
    { id: 'opt-f03', label: '103', value: 1.2, category: 'front' },
    { id: 'opt-f04', label: '104', value: 1.8, category: 'front' },
    { id: 'opt-f05', label: '105', value: 2.0, category: 'front' },
    { id: 'opt-f06', label: '1½', value: 1.3, category: 'front' },
    { id: 'opt-f07', label: '107', value: 2.2, category: 'front' },
    { id: 'opt-f08', label: '108', value: 2.5, category: 'front' },

    // Back saltos
    { id: 'opt-b01', label: '201', value: 1.0, category: 'back' },
    { id: 'opt-b02', label: '202', value: 1.4, category: 'back' },
    { id: 'opt-b03', label: '203', value: 1.6, category: 'back' },
    { id: 'opt-b04', label: '204', value: 1.9, category: 'back' },
    { id: 'opt-b05', label: '205', value: 2.1, category: 'back' },
    { id: 'opt-b06', label: '206', value: 2.3, category: 'back' },
    { id: 'opt-b07', label: '207', value: 2.6, category: 'back' },
    { id: 'opt-b08', label: '208', value: 2.9, category: 'back' },

    // Other
    { id: 'opt-o01', label: '301', value: 1.1, category: 'other' },
    { id: 'opt-o02', label: '302', value: 1.5, category: 'other' },
    { id: 'opt-o03', label: '303', value: 1.7, category: 'other' },
    { id: 'opt-o04', label: '401', value: 1.2, category: 'other' },
    { id: 'opt-o05', label: '403', value: 1.6, category: 'other' },
    { id: 'opt-o06', label: '5132', value: 2.0, category: 'other' },
];
