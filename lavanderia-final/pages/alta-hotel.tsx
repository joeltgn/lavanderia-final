import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const MATERIALES = [
  'Toalla de mano',
  'Toalla de ducha',
  'Alfombría',
  'Alfombra',
  'Colcha',
  'Nórdico'
];

export default function AltaHotel() {
  const [hotel, setHotel] = useState({
    nombre: '',
    estrellas: '',
    habitaciones: '',
    direccion: '',
    telefono: '',
    web: '',
    contactos: [{ nombre: '', telefono: '', email: '' }],
    materiales: {},
    dotacionBase: 1
  });

  const toggleMaterial = (material) => {
    setHotel((prev) => ({
      ...prev,
      materiales: {
        ...prev.materiales,
        [material]: !prev.materiales[material]
      }
    }));
  };

  const handleContactoChange = (i, field, value) => {
    const updated = [...hotel.contactos];
    updated[i][field] = value;
    setHotel({ ...hotel, contactos: updated });
  };

  const addContacto = () => {
    setHotel({
      ...hotel,
      contactos: [...hotel.contactos, { nombre: '', telefono: '', email: '' }]
    });
  };

  const guardarHotel = async () => {
    try {
      await addDoc(collection(db, 'hoteles'), hotel);
      alert('Hotel guardado correctamente');
      setHotel({
        nombre: '',
        estrellas: '',
        habitaciones: '',
        direccion: '',
        telefono: '',
        web: '',
        contactos: [{ nombre: '', telefono: '', email: '' }],
        materiales: {},
        dotacionBase: 1
      });
    } catch (error) {
      console.error('Error guardando hotel:', error);
      alert('Hubo un error al guardar el hotel.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Alta de Hotel</h1>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Nombre del hotel" value={hotel.nombre} onChange={(e) => setHotel({ ...hotel, nombre: e.target.value })} />
        <Input placeholder="Estrellas" value={hotel.estrellas} onChange={(e) => setHotel({ ...hotel, estrellas: e.target.value })} />
        <Input placeholder="Nº habitaciones" value={hotel.habitaciones} onChange={(e) => setHotel({ ...hotel, habitaciones: e.target.value })} />
        <Input placeholder="Dirección" value={hotel.direccion} onChange={(e) => setHotel({ ...hotel, direccion: e.target.value })} />
        <Input placeholder="Teléfono" value={hotel.telefono} onChange={(e) => setHotel({ ...hotel, telefono: e.target.value })} />
        <Input placeholder="Web" value={hotel.web} onChange={(e) => setHotel({ ...hotel, web: e.target.value })} />
      </div>

      <h2 className="font-semibold">Contactos</h2>
      {hotel.contactos.map((c, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <Input placeholder="Nombre" value={c.nombre} onChange={(e) => handleContactoChange(i, 'nombre', e.target.value)} />
          <Input placeholder="Teléfono" value={c.telefono} onChange={(e) => handleContactoChange(i, 'telefono', e.target.value)} />
          <Input placeholder="Email" value={c.email} onChange={(e) => handleContactoChange(i, 'email', e.target.value)} />
        </div>
      ))}
      <Button onClick={addContacto}>Añadir contacto</Button>

      <h2 className="font-semibold">Materiales asignados</h2>
      <div className="grid grid-cols-2 gap-2">
        {MATERIALES.map((mat) => (
          <label key={mat} className="flex items-center space-x-2">
            <Checkbox checked={hotel.materiales[mat] || false} onCheckedChange={() => toggleMaterial(mat)} />
            <span>{mat}</span>
          </label>
        ))}
      </div>

      <div className="pt-4">
        <Input
          type="number"
          placeholder="Dotación base (para montar el hotel una vez)"
          value={hotel.dotacionBase}
          onChange={(e) => setHotel({ ...hotel, dotacionBase: Number(e.target.value) })}
        />
      </div>

      <Button className="mt-4" onClick={guardarHotel}>Guardar hotel</Button>
    </div>
  );
}

