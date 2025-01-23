import fruits from '../assets/category/category1/AFruits.webp';
import atta from '../assets/category/category1/BAtta-Rice-Dal.webp';
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '../features/category/categoryApi';
import { BASE_URL } from '../../src/app/api/axios';
// const images = require.context('../assets/category', false, /\.(webp|png|jpe?g|svg)$/);


function CategoryCard() {
    // const imagePaths = images.keys().map((image) => images(image));
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    return (
        <>
            <div className="w-4/5 mx-auto m-11">
                <h1 className="text-x font-bold">Explore By Categories</h1>
            </div>
            <div className="w-4/5 mx-auto">
                <div className="grid grid-cols-8 grid-rows-5 place-items-center gap-y-3 gap-x-2">
                    {/* for wider images */}
                    <div className="col-span-2">
                        <Link to="/search">
                            {/* <img src={fruits} alt="Fruits" /> */}
                        </Link>
                    </div>

                    {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            // for other normal size images
                            <div key={index}>
                                <img src={`${BASE_URL}${category.image_path}`} alt={`Category ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                        <div>No categories available.</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CategoryCard;


// public function AddCategory(Request $data)
//     {
//         $validator = Validator::make($data->all(), [
//             'type' => 'required|numeric|max:99999|between:1,10',
//             'parent' => 'sometimes|nullable|numeric|exists:category,id|max:99999',
//             'customSort' => 'required|numeric|max:99999',
//             'name' => 'required|string|max:100|regex:/^[A-Za-z0-9\s]+$/',
//             'shortIntro' => 'sometimes|nullable|string|max:100|regex:/^[A-Za-z0-9\s]+$/',
//             'description' => 'sometimes|nullable|string|max:300|regex:/^[A-Za-z0-9\s]+$/',
//             'schemaMarkup' => 'sometimes|nullable|string',
//             'filetype' => 'required|array',
//             'file' => 'required|array',
//             'filetype.*' => 'required|numeric',
//             'file.*' => 'required|file|mimes:jpeg,png,gif,mp4,avi,flv,xls,xlsx,mp3,wav',
//         ]);

//         if ($validator->fails()) {
//             return response($validator->errors()->first(), 510);
//         } else {
//             try {
//                 if (isset($data['parent']) && $data['parent'] != "") {
//                     $parent = $data['parent'];
//                     $level = Category::find($data['parent'])->level + 1;
//                 } else {
//                     $parent = null;
//                     $level = 1;
//                 }
//                 $insertCategory = category::create([
//                     "type" => $data['type'],
//                     "parent" => $parent,
//                     "level" => $level,
//                     "custom_sort" => $data['customSort'],
//                     "name" => $data['name'],
//                     "short_intro" => $data['shortIntro'],
//                     "description" => $data['description'],
//                     "status" => 1,
//                     "created_at" => Carbon::now(),
//                     "updated_at" => Carbon::now(),
//                 ]);
//                 if ($data['parent'] == "") {
//                     $insertCategory->parent = $insertCategory->id;
//                     $insertCategory->save();
//                 }

//                 if (!empty($data['filetype'])) {
//                     foreach ($data['filetype'] as $key => $type) {
//                         $file = $data['file'][$key];
//                         $path = "public/category/" . $insertCategory->id;
//                         $file_path = "public/category/$insertCategory->id/" . $file->getClientOriginalName();

//                         if (!Storage::disk('public')->exists("category/" . $insertCategory->id)) {
//                             Storage::disk('public')->makeDirectory("category/" . $insertCategory->id);
//                         }

//                         if (!Storage::exists($file_path)) {
//                             Storage::putFileAs($path, $file, $file->getClientOriginalName());
//                             CategoryMediaDetail::create([
//                                 "category_id" => $insertCategory->id,
//                                 "type" => $type,
//                                 "file_path" => $path,
//                                 "file_name" => $file->getClientOriginalName(),
//                                 "created_at" => Carbon::now(),
//                                 "updated_at" => Carbon::now(),
//                             ]);
//                         }
//                     }
//                 }
//                 return response('Category added', 200);
//             } catch (Exception $e) {
//                 return response($e->getMessage(), 510);
//             }
//         }
//     }





