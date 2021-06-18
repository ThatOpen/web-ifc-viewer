import { Viewer } from './viewer';

jest.mock('three', () => {
  const THREE = jest.requireActual('three');
  return {
    ...THREE,
    WebGLRenderer: jest.fn().mockReturnValue({
      domElement: document.createElement('div'),
      setSize: jest.fn(),
      render: jest.fn(),
    }),
  };
});

const THREE = jest.requireActual('three');

describe('Viewer', () => {
  it('should create a ThreeJS Scene', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const viewer = new Viewer(canvas);
    expect(viewer.scene instanceof THREE.Scene).toBe(true);
  });
});