import { LandlordModels } from "./landlord-models";
import { ImagesModels } from "./images-models";
import { VideoModels } from "./video-models";

export class MotelModels {
    public _id !: string;
    public DiaChi!: string;
    public PhuongXa!:String;
    public DienTich!: number;
    public GiaThue!: number;
    public HinhAnh!: ImagesModels[];
    public Video!: VideoModels[];
    public LatLng!: string;
    public MoTa!: string;
    public SoLuong!: number;
    public TenNhaTro!: string;
    public TienNghi!: string;
    public GiaDien!: number;
    public GiaNuoc!: number;
    public GiaWifi!: number;
    public ChuNhaTro!: LandlordModels;
    public KhoangCach!:number;

}
