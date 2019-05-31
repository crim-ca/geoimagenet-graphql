const {make_model_root, make_model_file_path} = require('./ModelDataSource');

test('correctly makes model root', () => {
    const root = make_model_root(new Date('2019-12-23'), '/root');
    expect(root).toBe('/root/2019/12');
    const filepath = make_model_file_path(root, "annotations d'écran railroads ééé.png");
    expect(filepath).toBe("/root/2019/12/annotations d'écran railroads ééé.png");
});
