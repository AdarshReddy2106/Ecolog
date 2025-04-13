import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from './supabaseConfig';

export default function TreeDataListScreen() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trees')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error('Error fetching tree data');
      }
      
      setTrees(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTreeItem = ({ item }) => (
    <View style={styles.treeCard}>
      <View style={styles.treeInfo}>
        <Text style={styles.studentInfo}>
          Student: {item.student_name} ({item.student_roll_no})
        </Text>
        <Text style={styles.studentInfo}>Group: {item.student_group}</Text>
        <Text style={styles.treeId}>Tree ID: {item.tree_id}</Text>
        <Text style={styles.treeDetail}>Height: {item.height} cm</Text>
        <Text style={styles.treeDetail}>Primary Stems: {item.num_primary_stems}</Text>
        <Text style={styles.treeDetail}>Main Stem Diameter: {item.main_branch_diameter} cm</Text>
        <Text style={styles.treeDetail}>
          Primary Stem Diameters: {item.primary_stem_diameters.join(', ')}
        </Text>
      </View>
      {item.image_url && (
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.treeImage} 
          resizeMode="cover"
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a7c59" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Tree Data</Text>
      
      <TouchableOpacity 
        style={styles.refreshButton} 
        onPress={fetchTrees}
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      
      <FlatList
        data={trees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTreeItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tree data available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e8d2',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8e8d2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4a7c59',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#4a7c59',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  treeCard: {
    backgroundColor: '#f5f5dc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 3,
  },
  treeInfo: {
    flex: 1,
  },
  treeId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a7c59',
  },
  treeDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  treeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 50,
  },
  studentInfo: {
    fontSize: 16,
    color: '#4a7c59',
    marginBottom: 4,
    fontWeight: '500',
  },
});