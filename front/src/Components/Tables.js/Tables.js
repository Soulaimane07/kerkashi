import { Link } from "react-router-dom";
import { Nodata, NodataFor } from "./Nodata";
import { fournisseurVars } from "../Variables";

const FournisseurTableBase = ({ fournisseurs, client, showRas }) => {
    if (!fournisseurs?.length) {
        return client ? <NodataFor text="No fournisseurs for this client" /> : <Nodata text="No fournisseurs" />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Fournisseur ID</th>
                        <th scope="col" className="px-6 py-3">Nom complet</th>
                        <th scope="col" className="px-6 py-3">Raison Social</th>
                        <th scope="col" className="px-6 py-3">IF</th>
                        <th scope="col" className="px-6 py-3">ICE</th>
                        <th scope="col" className="px-6 py-3">Code tiers</th>
                        <th scope="col" className="px-6 py-3">Type activité</th>
                        {showRas && <th scope="col" className="px-6 py-3">Ras</th>}
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs.map((item) => (
                        <tr key={item._id} className="border-b text-gray-900 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                <Link to={`/fournisseurs/${item._id}`} className="hover:text-orange-500 transition-all underline text-blue-500">
                                    {item._id}
                                </Link>
                            </th>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{item.raisonsocial}</td>
                            <td className="px-6 py-4">{item.if}</td>
                            <td className="px-6 py-4">{item.ice}</td>
                            <td className="px-6 py-4">{item.code}</td>
                            <td className="px-6 py-4">{fournisseurVars?.activite[item.activite]?.title}</td>
                            {showRas && <td className="px-6 py-4">{item.ras} %</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const FournisseurTable = (props) => <FournisseurTableBase {...props} showRas={false} />;
export const FournisseurTableClient = (props) => <FournisseurTableBase {...props} showRas={true} />;

export const FournisseurSelectTable = ({ fournisseurs, selectedfournisseurs, setFournisseurs }) => {
    const toggleFournisseur = (fournisseur) => {
        const isAlreadySelected = selectedfournisseurs.some(item => item.fournisseur === fournisseur._id);
        setFournisseurs(isAlreadySelected
            ? selectedfournisseurs.filter(item => item.fournisseur !== fournisseur._id)
            : [...selectedfournisseurs, { fournisseur: fournisseur._id, ras: 0 }]
        );
    };

    const handleRasChange = (fournisseurId, rasValue) => {
        setFournisseurs(prevFournisseurs => prevFournisseurs.map(f =>
            f.fournisseur === fournisseurId ? { ...f, ras: Number(rasValue) } : f
        ));
    };

    return (
        <div className="overflow-x-auto">
            {fournisseurs?.length ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th className="px-6 py-3"></th>
                            <th className="px-6 py-3">Fournisseur ID</th>
                            <th className="px-6 py-3">Nom complet</th>
                            <th className="px-6 py-3">Raison Social</th>
                            <th className="px-6 py-3">IF</th>
                            <th className="px-6 py-3">ICE</th>
                            <th className="px-6 py-3">Code tiers</th>
                            <th className="px-6 py-3">Type activité</th>
                            <th className="px-6 py-3">Taux Ras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs.map((item) => {
                            const selectedFournisseur = selectedfournisseurs.find(f => f.fournisseur === item._id);
                            return (
                                <tr key={item._id} className="border-b cursor-pointer hover:bg-gray-200 transition-all text-gray-900 border-gray-200">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="scale-125 accent-orange-500"
                                            checked={!!selectedFournisseur}
                                            onChange={() => toggleFournisseur(item)}
                                        />
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        <Link to={`/fournisseurs/${item._id}`} className="hover:text-orange-500 transition-all underline text-blue-500">
                                            {item._id}
                                        </Link>
                                    </th>
                                    {['name', 'raisonsocial', 'if', 'ice', 'code'].map((field, idx) => (
                                        <td key={idx} className="px-6 py-4">{item[field]}</td>
                                    ))}
                                    <td className="px-6 py-4">{fournisseurVars?.activite[item.activite]?.title}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={selectedFournisseur?.ras || 0}
                                            disabled={!selectedFournisseur}
                                            onChange={(e) => handleRasChange(item._id, e.target.value)}
                                            className="bg-transparent outline-none w-full"
                                        >
                                            {fournisseurVars?.ras?.map((rasValue, key) => (
                                                <option value={rasValue} key={key}>{rasValue} %</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <Nodata text="No fournisseurs" />
            )}
        </div>
    );
};
